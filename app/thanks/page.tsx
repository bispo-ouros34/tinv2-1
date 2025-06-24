"use client"

import { motion } from "framer-motion"
import { CheckCircle, Mail, Clock, Shield, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import Link from "next/link"

export default function ThanksPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1C2833] to-[#6C63FF] relative overflow-hidden">
      {/* Floating particles - Reduced for mobile */}
      <div className="absolute inset-0 opacity-20">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-white rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              scale: [1, 1.5, 1],
              opacity: [0.3, 0.8, 0.3],
              y: [0, -20, 0],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Number.POSITIVE_INFINITY,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 container mx-auto px-4 py-8 sm:py-12 flex items-center justify-center min-h-screen">
        <div className="w-full max-w-2xl">
          {/* Success Icon */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.6, type: "spring" }}
            className="text-center mb-8 sm:mb-12"
          >
            <div className="w-20 h-20 sm:w-24 sm:h-24 bg-gradient-to-r from-green-500 to-green-600 rounded-full flex items-center justify-center mx-auto mb-6 sm:mb-8 shadow-2xl">
              <CheckCircle className="w-10 h-10 sm:w-12 sm:h-12 text-white" />
            </div>
            <motion.h1
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4"
            >
              🎉 Payment Successful!
            </motion.h1>
            <motion.p
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="text-gray-200 text-base sm:text-lg px-4 leading-relaxed"
            >
              Thank you for your purchase. Your complete report is being processed.
            </motion.p>
          </motion.div>

          {/* Main Card */}
          <motion.div initial={{ y: 40, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.7 }}>
            <Card className="bg-white rounded-2xl shadow-2xl border-0 mb-6 sm:mb-8">
              <CardContent className="p-6 sm:p-8">
                {/* Email Delivery Info */}
                <div className="text-center mb-8">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-4 sm:mb-6">
                    <Mail className="w-8 h-8 sm:w-10 sm:h-10 text-blue-600" />
                  </div>
                  <h2 className="text-xl sm:text-2xl font-bold text-[#333333] mb-3 sm:mb-4">
                    Complete Report Delivery
                  </h2>
                  <p className="text-gray-600 text-sm sm:text-base leading-relaxed mb-6">
                    Your complete confidential report will be delivered to your email address within the next{" "}
                    <span className="font-bold text-[#FF0066]">7 days</span>.
                  </p>
                </div>

                {/* Timeline */}
                <div className="space-y-4 sm:space-y-6 mb-8">
                  <div className="flex items-start gap-4">
                    <div className="w-8 h-8 sm:w-10 sm:h-10 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-[#333333] text-sm sm:text-base mb-1">Payment Confirmed</h3>
                      <p className="text-gray-600 text-xs sm:text-sm">Your payment has been successfully processed</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-8 h-8 sm:w-10 sm:h-10 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <Clock className="w-4 h-4 sm:w-5 sm:h-5 text-white animate-spin" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-[#333333] text-sm sm:text-base mb-1">Report Processing</h3>
                      <p className="text-gray-600 text-xs sm:text-sm">
                        Our advanced systems are compiling your complete confidential report
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gray-300 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <Mail className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-[#333333] text-sm sm:text-base mb-1">Email Delivery</h3>
                      <p className="text-gray-600 text-xs sm:text-sm">
                        Complete report will be sent to your email within 7 days
                      </p>
                    </div>
                  </div>
                </div>

                {/* What's Included */}
                <div className="bg-gray-50 rounded-2xl p-4 sm:p-6 mb-6 sm:mb-8">
                  <h3 className="font-bold text-[#333333] text-base sm:text-lg mb-4">Your Complete Report Includes:</h3>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                      <span className="text-sm sm:text-base text-[#333333]">
                        All profile photos (including private ones)
                      </span>
                    </div>
                    <div className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                      <span className="text-sm sm:text-base text-[#333333]">
                        Complete conversation history and messages
                      </span>
                    </div>
                    <div className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                      <span className="text-sm sm:text-base text-[#333333]">
                        Exact location data and dating activity
                      </span>
                    </div>
                    <div className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                      <span className="text-sm sm:text-base text-[#333333]">
                        Detailed activity timeline and patterns
                      </span>
                    </div>
                  </div>
                </div>

                {/* Important Notice */}
                <div className="bg-yellow-50 border-2 border-yellow-200 rounded-2xl p-4 sm:p-6 mb-6 sm:mb-8">
                  <div className="flex items-start gap-3">
                    <Shield className="w-5 h-5 sm:w-6 sm:h-6 text-yellow-600 flex-shrink-0 mt-1" />
                    <div>
                      <h4 className="font-bold text-yellow-800 text-sm sm:text-base mb-2">Important Notice</h4>
                      <p className="text-yellow-700 text-xs sm:text-sm leading-relaxed">
                        Please check your email regularly, including your spam/junk folder. The report will be sent from
                        a secure email address. If you don't receive it within 7 days, please contact our support team.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Back to Home Button */}
                <div className="text-center">
                  <Link href="/">
                    <Button className="bg-gradient-to-r from-[#6C63FF] to-[#8B5CF6] hover:from-[#5B52E8] hover:to-[#7C3AED] text-white font-bold py-3 sm:py-4 px-6 sm:px-8 text-base sm:text-lg rounded-2xl shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 touch-manipulation">
                      <ArrowLeft className="w-5 h-5 mr-2" />
                      Back to Home
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Footer Notice */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 1.0 }}
            className="text-center"
          >
            <p className="text-gray-300 text-xs sm:text-sm flex items-center justify-center gap-2 font-medium">
              <Shield className="w-4 h-4" />
              100% confidential and secure processing
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
