"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Zap } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { useLanguage } from "@/contexts/LanguageContext";

export default function SignupPage() {
  const { t } = useLanguage();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const router = useRouter();

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (!agreedToTerms) {
      setError(t("auth.signup.termsError") || "Lütfen şartları kabul edin.");
      setLoading(false);
      return;
    }

    try {
      // 1. Kritik Değişiklik: full_name'i metadata olarak gönderiyoruz
      // Böylece SQL Trigger'ımız bunu yakalayıp profili oluşturacak.
      const { data, error: signUpError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: fullName, // İsim bilgisi burada gidiyor
          },
        },
      });

      if (signUpError) throw signUpError;

      // 2. Değişiklik: Manuel profil oluşturma kodunu kaldırdık.
      // Çünkü SQL trigger bunu otomatik yapıyor. Burası çakışma yaratıyordu.

      if (data.user) {
        setShowConfirmModal(true);
      }
    } catch (err: any) {
      setError(err.message || "An error occurred during signup");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 relative overflow-hidden">
      {/* Arkaplan Efektleri */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-1/2 -left-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl" />
        <div className="absolute -bottom-1/2 -right-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md relative z-10"
      >
        <div className="bg-card/50 backdrop-blur-sm border border-border rounded-2xl p-8 shadow-2xl">
          <Link href="/" className="flex items-center justify-center gap-2 mb-8">
            <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-blue-600 rounded-lg flex items-center justify-center">
              <Zap className="w-7 h-7 text-white" />
            </div>
            <span className="text-2xl font-bold">Autostep</span>
          </Link>

          <h1 className="text-3xl font-bold text-center mb-2">{t("auth.signup.title")}</h1>
          <p className="text-gray-400 text-center mb-8">
            {t("auth.signup.subtitle")}
          </p>

          <form onSubmit={handleSignup} className="space-y-6">
            {/* İsim Kutusu */}
            <div className="space-y-2">
              <Label htmlFor="fullName">{t("auth.signup.fullName")}</Label>
              <Input
                id="fullName"
                type="text"
                placeholder={t("auth.signup.fullNamePlaceholder") || "John Doe"}
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                required
                className="bg-background/50"
              />
            </div>

            {/* Email Kutusu */}
            <div className="space-y-2">
              <Label htmlFor="email">{t("auth.signup.email")}</Label>
              <Input
                id="email"
                type="email"
                placeholder={t("auth.signup.emailPlaceholder") || "name@example.com"}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="bg-background/50"
              />
            </div>

            {/* Şifre Kutusu */}
            <div className="space-y-2">
              <Label htmlFor="password">{t("auth.signup.password")}</Label>
              <Input
                id="password"
                type="password"
                placeholder={t("auth.signup.passwordPlaceholder") || "******"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={6}
                className="bg-background/50"
              />
              <p className="text-xs text-gray-500">
                {t("auth.signup.passwordHint")}
              </p>
            </div>

            {/* Şartlar Checkbox */}
            <div className="flex items-start space-x-2">
              <Checkbox
                id="terms"
                checked={agreedToTerms}
                onCheckedChange={(checked) => setAgreedToTerms(checked as boolean)}
                required
              />
              <label
                htmlFor="terms"
                className="text-sm text-gray-400 leading-relaxed cursor-pointer"
              >
                {t("auth.signup.agreeToTerms")}{" "}
                <Link
                  href="/terms"
                  className="text-purple-400 hover:text-purple-300 underline"
                  onClick={(e) => e.stopPropagation()}
                >
                  {t("auth.signup.termsLink")}
                </Link>{" "}
                {t("auth.signup.and")}{" "}
                <Link
                  href="/privacy"
                  className="text-purple-400 hover:text-purple-300 underline"
                  onClick={(e) => e.stopPropagation()}
                >
                  {t("auth.signup.privacyLink")}
                </Link>
              </label>
            </div>

            {/* Hata Mesajı */}
            {error && (
              <div className="text-red-400 text-sm bg-red-500/10 border border-red-500/20 rounded-lg p-3">
                {error}
              </div>
            )}

            {/* Buton */}
            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
              size="lg"
            >
              {loading ? t("auth.signup.creatingAccount") : t("auth.signup.createAccount")}
            </Button>
          </form>

          <p className="text-center text-gray-400 mt-6">
            {t("auth.signup.alreadyHaveAccount")}{" "}
            <Link href="/login" className="text-purple-400 hover:text-purple-300">
              {t("auth.signup.signIn")}
            </Link>
          </p>
        </div>
      </motion.div>

      {/* Onay Modalı */}
      <Dialog open={showConfirmModal} onOpenChange={setShowConfirmModal}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-center">
              {t("auth.signup.modal.title")}
            </DialogTitle>
            <DialogDescription className="text-center text-base pt-4">
              {t("auth.signup.modal.description")}
            </DialogDescription>
          </DialogHeader>
          <div className="flex justify-center pt-4">
            <Button
              onClick={() => setShowConfirmModal(false)}
              className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
            >
              {t("auth.signup.modal.close")}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
