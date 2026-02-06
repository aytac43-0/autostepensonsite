import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { SupabaseClient } from '@supabase/supabase-js'

export type AccessCheckResult = {
    hasAccess: boolean
    expiresAt: string | null
    status: 'active' | 'suspended' | 'expired' | 'none'
}

export class AccessService {
    constructor(private supabase: SupabaseClient) { }

    /**
     * Checks if a user has active access to a product.
     * Access is valid if:
     * 1. Status is 'active'
     * 2. AND (expires_at is NULL OR expires_at > now())
     */
    async checkAccess(userId: string, productId: string): Promise<AccessCheckResult> {
        const { data, error } = await this.supabase
            .from('user_products')
            .select('status, expires_at')
            .eq('user_id', userId)
            .eq('product_id', productId)
            .single()

        if (error || !data) {
            return { hasAccess: false, expiresAt: null, status: 'none' }
        }

        const { status, expires_at } = data

        // Check Status
        if (status !== 'active') {
            return { hasAccess: false, expiresAt: expires_at, status }
        }

        // Check Expiry
        if (expires_at) {
            const expiryDate = new Date(expires_at)
            if (expiryDate < new Date()) {
                return { hasAccess: false, expiresAt: expires_at, status: 'expired' }
            }
        }

        return { hasAccess: true, expiresAt: expires_at, status: 'active' }
    }

    /**
     * Grant access to a product.
     * Only accessible by Admins (via RLS) or Server-side operations.
     */
    async grantAccess(userId: string, productId: string, durationDays?: number) {
        let expiresAt = null
        if (durationDays) {
            const date = new Date()
            date.setDate(date.getDate() + durationDays)
            expiresAt = date.toISOString()
        }

        // Upsert to handle re-subscriptions
        return await this.supabase
            .from('user_products')
            .upsert({
                user_id: userId,
                product_id: productId,
                status: 'active',
                expires_at: expiresAt,
                updated_at: new Date().toISOString()
            }, { onConflict: 'user_id, product_id' })
    }

    /**
     * Revoke or suspend access.
     */
    async setStatus(userId: string, productId: string, status: 'suspended' | 'expired') {
        return await this.supabase
            .from('user_products')
            .update({ status, updated_at: new Date().toISOString() })
            .eq('user_id', userId)
            .eq('product_id', productId)
    }
}
