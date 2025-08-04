import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { CheckCircle2, Mail, Calendar, User, CreditCard, Loader2 } from "lucide-react";
import { toast } from "sonner";

const API_BASE_URL = "https://hnm2-be.vercel.app";

export default function PaymentSuccess() {
  const [paymentDetails, setPaymentDetails] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [intentId, setIntentId] = useState<string | null>(null);

  useEffect(() => {
    // Get registration intent ID from localStorage
    const storedIntentId = localStorage.getItem("registrationIntentId");
    
    if (storedIntentId) {
      setIntentId(storedIntentId);
      fetchRegistrationIntent(storedIntentId);
    } else {
      setLoading(false);
      toast.error("No registration information found. Please contact support.");
    }
  }, []);

  const fetchRegistrationIntent = async (intentId: string) => {
    try {
      const response = await fetch(`${API_BASE_URL}/payments/registration-intent/${intentId}`);
      
      if (response.ok) {
        const data = await response.json();
        setPaymentDetails(data.intent);
        toast.success("Registration details loaded successfully!");
      } else {
        toast.error("Could not load registration details. Please contact support.");
      }
    } catch (error) {
      console.error("Error fetching registration intent:", error);
      toast.error("Error loading registration details. Please contact support.");
    } finally {
      setLoading(false);
    }
  };

  const clearRegistrationData = () => {
    localStorage.removeItem("registrationIntentId");
    localStorage.removeItem("userEmail");
    localStorage.removeItem("userName");
  };

  if (loading) {
    return (
      <div className="bg-black text-white min-h-screen flex items-center justify-center font-hnm">
        <div className="text-center">
          <Loader2 size={48} className="animate-spin mx-auto mb-4 text-red-600" />
          <h2 className="text-2xl font-bold text-red-600 mb-2">Loading Registration Details</h2>
          <p className="text-gray-400">Please wait while we verify your payment...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-black text-white min-h-screen px-6 py-10 font-hnm">
      <div className="max-w-2xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="inline-flex items-center justify-center w-20 h-20 bg-green-600 rounded-full mb-6"
          >
            <CheckCircle2 size={40} className="text-white" />
          </motion.div>
          
          <h1 className="text-4xl font-bold text-green-400 mb-4">
            Payment Successful!
          </h1>
          <p className="text-xl text-gray-300 mb-2">
            Welcome to Hikari no Matsuri 2024!
          </p>
          <p className="text-gray-400">
            Your registration has been confirmed and you'll receive a confirmation email shortly.
          </p>
        </motion.div>

        {paymentDetails && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="bg-gray-900 rounded-lg p-6 border border-gray-700"
          >
            <h2 className="text-2xl font-bold text-red-600 mb-6">Registration Details</h2>
            
            <div className="grid md:grid-cols-2 gap-4">
              <div className="flex items-center gap-3 mb-4">
                <User size={20} className="text-red-600" />
                <div>
                  <p className="text-gray-400 text-sm">Name</p>
                  <p className="font-semibold">{paymentDetails.userName}</p>
                </div>
              </div>

              <div className="flex items-center gap-3 mb-4">
                <Mail size={20} className="text-red-600" />
                <div>
                  <p className="text-gray-400 text-sm">Email</p>
                  <p className="font-semibold">{paymentDetails.userEmail}</p>
                </div>
              </div>

              <div className="flex items-center gap-3 mb-4">
                <CreditCard size={20} className="text-red-600" />
                <div>
                  <p className="text-gray-400 text-sm">Pass Type</p>
                  <p className="font-semibold">{paymentDetails.passName}</p>
                </div>
              </div>

              <div className="flex items-center gap-3 mb-4">
                <Calendar size={20} className="text-red-600" />
                <div>
                  <p className="text-gray-400 text-sm">Registration Date</p>
                  <p className="font-semibold">
                    {new Date(paymentDetails.createdAt.seconds * 1000).toLocaleDateString()}
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-6 p-4 bg-gray-800 rounded border border-gray-600">
              <p className="text-sm text-gray-400 mb-2">Registration ID</p>
              <p className="font-mono text-green-400 text-lg">{paymentDetails.intentId}</p>
            </div>
          </motion.div>
        )}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="mt-8 text-center"
        >
          <div className="bg-blue-900 border border-blue-600 rounded-lg p-6 mb-6">
            <h3 className="text-xl font-bold text-blue-400 mb-3">What's Next?</h3>
            <div className="text-left space-y-2 text-gray-300">
              <p>• Check your email for the confirmation and event details</p>
              <p>• Join our Discord server for updates and community</p>
              <p>• Mark your calendar for the event dates</p>
              <p>• Follow us on social media for announcements</p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/"
              className="px-6 py-3 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700 transition"
            >
              Back to Home
            </a>
            <button
              onClick={clearRegistrationData}
              className="px-6 py-3 bg-gray-600 text-white rounded-lg font-semibold hover:bg-gray-700 transition"
            >
              Clear Local Data
            </button>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="mt-8 p-4 bg-yellow-900 border border-yellow-600 rounded-lg"
        >
          <p className="text-yellow-200 text-sm">
            <strong>Need Help?</strong> If you have any questions or concerns about your registration, 
            please contact us at <a href="mailto:support@hikarinomatsuri.com" className="underline">support@hikarinomatsuri.com</a> 
            with your Registration ID.
          </p>
        </motion.div>
      </div>
    </div>
  );
}
