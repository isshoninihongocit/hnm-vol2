// "use client";
//
// import { PiCheckCircleFill } from "react-icons/pi";
// import { useState, useEffect } from "react";
// import { useAuth } from "../context/AuthContext";
// import { useNavigate } from "@remix-run/react";
//
// // Environment variables - hardcoded for client-side
// const RAZORPAY_KEY_ID = "rzp_test_XpGqUxppRlmhUu";
// const API_BASE_URL = "https://hnm2-be.vercel.app";
//
// const plans = [
//   {
//     index: 0,
//     name: "General",
//     price: 100,
//     features: [
//       "Canvas Painting – Strokes of HnM (Day 1 & 2)",
//       "Akihabara no Quest – Japanese × Anime Quiz (Day 1 & 2)",
//       "O-Talku Zone! – Talk and Interact Area (Day 1 & 2)",
//       "Obstacle Course – Nihon Ninja Run (Day 1 & 2)",
//       "Hanetsuki (Day 1)",
//       "Musical Performance – Notes of Nippon (Day 2)",
//       "Artist Alley (Day 2)",
//       "Digital Certificate of Participation",
//     ],
//     style: "rounded-3xl py-10 bg-clip-text text-transparent bg-gradient-to-b from-neutral-300 to-neutral-50",
//     description: "The General Pass gives you access to the heart of Hikari no Matsuri! Join us for two days of anime quizzes, ninja runs, art, and cultural exchange — perfect for all Japanese culture enthusiasts.",
//     button: "Buy Now",
//     type: "pass"
//   },
//   {
//     index: 1,
//     name: "Premium",
//     price: 200,
//     features: [
//       "All General Pass Events",
//       "Exclusive Access to Yukata Experience – Dress Like a Native (Day 2)",
//       "Shodō – Japanese Calligraphy Workshop (Day 2)",
//       "VIP Seat Access for Cultural Shows & Performances",
//       "Custom Event Badge & Premium Merchandise",
//       "Digital Certificate of Premium Participation",
//     ],
//     style: "rounded-3xl py-10 bg-clip-text text-transparent bg-gradient-to-b from-neutral-300 to-neutral-50",
//     description: "Unlock the full experience of Hikari no Matsuri with our Premium Pass. Immerse yourself in Japanese culture through exclusive workshops, VIP access, and special merch. For the true Nihon enthusiast!",
//     button: "Buy Now",
//     type: "pass"
//   },
//   {
//     index: 2,
//     name: "Workshops & Add-Ons",
//     price: 300,
//     features: [
//       "Includes General + Premium Pass Features",
//       "Kendo Workshop",
//       "Origami & Japanese Crafts",
//       "Japanese Calligraphy (Shodō)",
//       "Participation Certificate for each workshop",
//       "Expert-led Sessions",
//       "Materials Provided On-Site",
//       "Limited Slots Available per Workshop",
//     ],
//     style: "h-full rounded-3xl py-10 flex flex-col bg-clip-text text-transparent bg-gradient-to-b from-neutral-300 to-neutral-50",
//     description: "Enhance your Hikari no Matsuri experience by enrolling in our exclusive workshops. Gain hands-on learning and cultural immersion from professionals.",
//     button: "Contact Us",
//     type: "workshop-bundle"
//   },
//   {
//     index: 3,
//     name: "Shodo Workshop",
//     price: 300,
//     features: [
//       "Traditional Japanese Calligraphy",
//       "Ink & Brush Provided",
//       "Hands-on Guided Session",
//       "Take-home Art Piece",
//       "Participation Certificate",
//     ],
//     style: "rounded-3xl py-10 bg-clip-text text-transparent bg-gradient-to-b from-neutral-300 to-neutral-50",
//     description: "Experience the art of Shodō — master the brush strokes of Japanese calligraphy in this culturally immersive workshop.",
//     button: "Join Shodō",
//     type: "workshop"
//   },
//   {
//     index: 4,
//     name: "Kendo Workshop",
//     price: 300,
//     features: [
//       "Intro to Japanese Swordsmanship",
//       "Practice with Bamboo Shinai",
//       "Kata Demonstrations",
//       "Safety Gear Provided",
//       "Participation Certificate",
//     ],
//     style: "h-full rounded-3xl py-10 flex flex-col bg-clip-text text-transparent bg-gradient-to-b from-neutral-300 to-neutral-50",
//     description: "Step into the spirit of the samurai and learn the fundamentals of Kendo — the way of the sword, taught by trained instructors.",
//     button: "Join Kendo",
//     type: "workshop"
//   },
//   {
//     index: 5,
//     name: "Origami Workshop",
//     price: 300,
//     features: [
//       "Learn Traditional Origami Techniques",
//       "Create Multiple Origami Figures",
//       "Paper Materials Included",
//       "Cultural Storytelling Session",
//       "Participation Certificate",
//     ],
//     style: "h-full rounded-3xl py-10 flex flex-col bg-clip-text text-transparent bg-gradient-to-b from-neutral-300 to-neutral-50",
//     description: "Unfold the stories behind paper art — join this fun and relaxing origami session with cultural insights.",
//     button: "Join Origami",
//     type: "workshop"
//   },
// ];
//
// const RegistrationPage = () => {
//   const { user } = useAuth();
//   const navigate = useNavigate();
//   const [isLoading, setIsLoading] = useState(false);
//   const [loadingPlanIndex, setLoadingPlanIndex] = useState<number | null>(null);
//
//   // 🔥 UPDATED: Simplified state for purchased plans using new streamlined endpoint
//   const [purchasedPlans, setPurchasedPlans] = useState<any[]>([]);
//   const [purchasesLoaded, setPurchasesLoaded] = useState(false);
//
//   console.log('🚀 RegistrationPage: Component mounted/rendered');
//   console.log('📍 RegistrationPage: Current location:', typeof window !== 'undefined' ? window.location.href : 'SSR');
//   console.log('� RegistrationPage: User state:', user ? { uid: user.uid, email: user.email, username: user.username } : 'null');
//   console.log('🔐 RegistrationPage: User authenticated:', !!user);
//
//   // Debug function to test login
//   // const testLogin = async () => {
//   //   console.log('🧪 Testing login with test credentials');
//   //   try {
//   //     const response = await fetch('https://hnm2-be.vercel.app/auth/login', {
//   //       method: 'POST',
//   //       headers: { 'Content-Type': 'application/json' },
//   //       body: JSON.stringify({ email: 'test@test.com', password: 'password123' })
//   //     });
//   //     const data = await response.json();
//   //     console.log('🧪 Test login response:', data);
//   //   } catch (error) {
//   //     console.error('🧪 Test login error:', error);
//   //   }
//   // };
//
//   // 🔥 NEW: Streamlined function to fetch purchased plan names
//   const fetchPurchasedPlans = async (userEmail: string) => {
//     console.log('📊 Fetching purchased plans for email:', userEmail);
//
//     try {
//       const response = await fetch(`${API_BASE_URL}/payments/purchased-plans/${encodeURIComponent(userEmail)}`, {
//         method: 'GET',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//       });
//
//       console.log('📥 Purchased plans response status:', response.status);
//
//       if (!response.ok) {
//         if (response.status === 404) {
//           console.log('ℹ️ No purchased plans found for user');
//           return [];
//         }
//         throw new Error(`Failed to fetch purchased plans: ${response.status}`);
//       }
//
//       const result = await response.json();
//       console.log('✅ Purchased plans fetched:', result);
//       return result.purchasedPlans || [];
//
//     } catch (error) {
//       console.error('❌ Error fetching purchased plans:', error);
//       return [];
//     }
//   };
//
//   // 🔥 UPDATED: Simplified check function
//   const isPlanPurchased = (planName: string, planType: string) => {
//     if (!purchasesLoaded || !user?.email) return false;
//
//     return purchasedPlans.some(plan =>
//       plan.planName === planName && plan.planType === planType
//     );
//   };
//
//   // 🔥 NEW: Get purchase details for a plan
//   const getPurchaseDetails = (planName: string, planType: string) => {
//     return purchasedPlans.find(plan =>
//       plan.planName === planName && plan.planType === planType
//     );
//   };
//
//   // 🔥 UPDATED: Load purchased plans when component mounts
//   useEffect(() => {
//     const loadPurchasedPlans = async () => {
//       if (user?.email && !purchasesLoaded) {
//         console.log('🔄 Loading purchased plans by email...');
//         const plans = await fetchPurchasedPlans(user.email);
//         setPurchasedPlans(plans);
//         setPurchasesLoaded(true);
//       }
//     };
//
//     loadPurchasedPlans();
//   }, [user?.email, purchasesLoaded]);
//
//   // Function to create order via your backend
//   const createOrder = async (amount: number, eventDetails: any, user: any) => {
//     console.log('📦 createOrder called with:', {
//       amount,
//       eventDetails,
//       user,
//       apiUrl: `${API_BASE_URL}/payments/create-order`
//     });
//
//     try {
//       const requestBody = {
//         amount,
//         currency: 'INR',
//         receipt: `receipt_${Date.now()}`,
//         eventDetails,
//         user
//       };
//
//       console.log('📡 Sending request to backend:', requestBody);
//
//       const response = await fetch(`${API_BASE_URL}/payments/create-order`, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(requestBody),
//       });
//
//       console.log('📥 Backend response status:', response.status);
//       console.log('📥 Backend response ok:', response.ok);
//
//       if (!response.ok) {
//         const errorText = await response.text();
//         console.error('❌ Backend error response:', errorText);
//         throw new Error(`Failed to create order: ${response.status} - ${errorText}`);
//       }
//
//       const orderData = await response.json();
//       console.log('✅ Order created successfully:', orderData);
//       return orderData;
//
//     } catch (error) {
//       console.error('❌ Error creating order:', error);
//       throw error;
//     }
//   };
//
//   // Load Razorpay script - FIXED VERSION
//   const loadRazorpayScript = () => {
//     console.log('📜 Loading Razorpay script...');
//
//     return new Promise((resolve) => {
//       // ✅ FIXED: Check if Razorpay object exists, not just the script tag
//       if ((window as any).Razorpay) {
//         console.log('✅ Razorpay already loaded and available');
//         resolve(true);
//         return;
//       }
//
//       // Check if script tag exists but Razorpay isn't loaded yet
//       const existingScript = document.getElementById('razorpay-sdk');
//       if (existingScript) {
//         console.log('📜 Script tag exists, waiting for Razorpay to load...');
//
//         // Wait for the existing script to load
//         const checkRazorpay = setInterval(() => {
//           if ((window as any).Razorpay) {
//             console.log('✅ Razorpay loaded from existing script');
//             clearInterval(checkRazorpay);
//             resolve(true);
//           }
//         }, 100);
//
//         // Timeout after 10 seconds
//         setTimeout(() => {
//           clearInterval(checkRazorpay);
//           console.error('❌ Timeout waiting for existing Razorpay script');
//           resolve(false);
//         }, 10000);
//
//         return;
//       }
//
//       // Create new script if it doesn't exist
//       console.log('📜 Creating new Razorpay script tag...');
//       const script = document.createElement('script');
//       script.id = 'razorpay-sdk';
//       script.src = 'https://checkout.razorpay.com/v1/checkout.js';
//
//       script.onload = () => {
//         console.log('✅ Razorpay script loaded successfully');
//
//         // Double-check that Razorpay is actually available
//         if ((window as any).Razorpay) {
//           resolve(true);
//         } else {
//           console.error('❌ Script loaded but Razorpay not available');
//           resolve(false);
//         }
//       };
//
//       script.onerror = () => {
//         console.error('❌ Failed to load Razorpay script');
//         resolve(false);
//       };
//
//       document.body.appendChild(script);
//     });
//   };
//
//   // Handle payment process - UPDATED with streamlined duplicate check
//   const handlePayment = async (plan: any) => {
//     console.log('💳 handlePayment called for plan:', plan);
//
//     // 🔥 AUTHENTICATION CHECK: Redirect to login if user is not authenticated
//     if (!user) {
//       console.log('🔐 User not authenticated, redirecting to login');
//       // Store the current path and plan info for after login
//       const currentPath = window.location.pathname + window.location.search;
//       navigate(`/login?redirect=${encodeURIComponent(currentPath)}&plan=${encodeURIComponent(plan.name)}`);
//       return;
//     }
//
//     // Skip payment for contact-only plans
//     if (plan.index === 2) {
//       console.log('📞 Contact plan selected, showing alert');
//       alert("Please contact us for workshop bundles at contact@hikarinomatsuri.com");
//       return;
//     }
//
//     // 🔥 UPDATED: Check for duplicate purchases using streamlined data
//     if (user?.email && purchasesLoaded) {
//       console.log('🔍 Checking for duplicate purchases...');
//
//       if (isPlanPurchased(plan.name, plan.type)) {
//         const purchaseDetails = getPurchaseDetails(plan.name, plan.type);
//         const purchaseDate = purchaseDetails?.purchaseDate
//           ? new Date(purchaseDetails.purchaseDate).toLocaleDateString()
//           : 'Unknown date';
//
//         alert(
//           `🚫 Already Purchased!
//
//           You have already bought the "${plan.name}" ${plan.type}.
//
//           Purchase Date: ${purchaseDate}
//           Payment ID: ${purchaseDetails?.paymentId || 'N/A'}
//
//           You cannot purchase the same item twice.
//
//           If you believe this is an error, please contact support.`
//         );
//         return;
//       }
//     }
//
//     // Check if purchases are still loading
//     if (user?.email && !purchasesLoaded) {
//       alert("⏳ Loading your purchase history. Please wait a moment and try again.");
//       return;
//     }
//
//     console.log('🔄 Starting payment process...');
//     setIsLoading(true);
//     setLoadingPlanIndex(plan.index);
//
//     try {
//       // Load Razorpay script
//       console.log('🔍 Checking Razorpay script...');
//       const scriptLoaded = await loadRazorpayScript();
//       if (!scriptLoaded) {
//         throw new Error('Failed to load Razorpay script');
//       }
//
//       // User details
//       const paymentUser = {
//         id: user?.uid || null,
//         name: user?.username || user?.email?.split('@')[0] || 'Guest User',
//         email: user?.email || 'guest@example.com'
//       };
//       console.log('👤 Payment user details:', paymentUser);
//
//       // Event details
//       const eventDetails = {
//         name: plan.name,
//         type: plan.type,
//         description: plan.description
//       };
//       console.log('🎟️ Event details:', eventDetails);
//
//       // Create order via backend
//       console.log('🔨 Creating order...');
//       const orderData = await createOrder(plan.price, eventDetails, paymentUser);
//
//       // Razorpay options
//       const options = {
//         key: RAZORPAY_KEY_ID,
//         amount: orderData.amount,
//         currency: orderData.currency,
//         name: "Hikari no Matsuri",
//         description: `Registration for ${plan.name}`,
//         order_id: orderData.id,
//         handler: function (response: any) {
//           console.log('🎉 Payment Success:', response);
//           storePaymentViaAPI(response, orderData, plan, paymentUser)
//           .then((result) => {
//             console.log('✅ Payment stored via backend:', result);
//
//             // 🔥 UPDATED: Refresh purchased plans using streamlined endpoint
//             if (user?.email) {
//               fetchPurchasedPlans(user.email).then(plans => {
//                 setPurchasedPlans(plans);
//               });
//             }
//
//             alert(
//               `🎉 Payment successful!
//               Payment ID: ${response.razorpay_payment_id}
//               Order ID: ${response.razorpay_order_id}
//
//               Your registration has been confirmed and stored securely.
//               Reference ID: ${result.firestoreDocId || result.docId}
//
//               You will receive a confirmation email shortly.`
//             );
//           })
//           .catch((apiError) => {
//             console.error('❌ Backend storage failed:', apiError);
//
//             alert(
//               `✅ Payment successful!
//               Payment ID: ${response.razorpay_payment_id}
//
//               Note: There was an issue saving your registration data.
//               Please contact support with your payment ID.`
//             );
//           });
//           verifyPayment(response);
//         },
//         prefill: {
//           name: paymentUser.name,
//           email: paymentUser.email,
//         },
//         theme: {
//           color: "#dc2626"
//         },
//         modal: {
//           ondismiss: function() {
//             console.log('❌ Payment modal closed by user');
//             setIsLoading(false);
//             setLoadingPlanIndex(null);
//           }
//         }
//       };
//
//       console.log('⚙️ Razorpay options configured:', {
//         key: options.key,
//         amount: options.amount,
//         currency: options.currency,
//         order_id: options.order_id,
//         prefill: options.prefill
//       });
//
//       console.log('🔍 Checking if Razorpay is available on window...');
//       if (!(window as any).Razorpay) {
//         throw new Error('Razorpay is not loaded on window object');
//       }
//
//       console.log('✅ Creating Razorpay instance...');
//       const razorpay = new (window as any).Razorpay(options);
//
//       razorpay.on('payment.failed', function (response: any) {
//         console.error('❌ Payment Failed:', response.error);
//
//         // Store failed payment data
//         const failedPaymentData = {
//           errorCode: response.error.code,
//           errorDescription: response.error.description,
//           planName: plan.name,
//           planType: plan.type,
//           planPrice: plan.price,
//           userName: paymentUser.name,
//           userEmail: paymentUser.email,
//           userId: paymentUser.id,
//           attemptedAmount: orderData?.amount || plan.price * 100
//         };
//
//         storeFailedPaymentViaAPI(failedPaymentData);
//
//         alert(`Payment failed: ${response.error.description}`);
//         setIsLoading(false);
//         setLoadingPlanIndex(null);
//       });
//
//       console.log('🚀 Opening Razorpay checkout...');
//       razorpay.open();
//
//     } catch (error) {
//       console.error('❌ Payment Error:', error);
//       alert('Failed to initiate payment. Please try again.');
//       setIsLoading(false);
//       setLoadingPlanIndex(null);
//     }
//   };
//
//   // Function to store successful payment via backend API
//   const storePaymentViaAPI = async (paymentData: any, orderData: any, planData: any, userData: any) => {
//     console.log('🚀 Storing payment via backend API...');
//
//     try {
//       const response = await fetch(`${API_BASE_URL}/payments/store-payment`, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//           // Backend validation fields
//           paymentId: paymentData.razorpay_payment_id,
//           orderId: orderData.id,
//           amount: planData.price,
//           currency: orderData.currency || 'INR',
//           userEmail: userData.email,
//           events: [planData.name],
//           // Detailed data for storage
//           paymentData: {
//             razorpay_payment_id: paymentData.razorpay_payment_id,
//             razorpay_order_id: paymentData.razorpay_order_id,
//             razorpay_signature: paymentData.razorpay_signature
//           },
//           orderData: {
//             id: orderData.id,
//             amount: orderData.amount,
//             currency: orderData.currency,
//             receipt: orderData.receipt
//           },
//           planData: {
//             name: planData.name,
//             type: planData.type,
//             price: planData.price,
//             description: planData.description,
//             features: planData.features
//           },
//           userData: {
//             id: userData.id || null,
//             name: userData.name,
//             email: userData.email
//           },
//           // Registration data for email sending
//           registrationData: {
//             registrationId: `HNM-${Date.now()}`,
//             userEmail: userData.email,
//             userName: userData.name,
//             selectedPass: planData.name,
//             passType: planData.type,
//             dayPass: planData.name,
//             planName: planData.name,
//             planType: planData.type,
//             planPrice: planData.price
//           }
//         }),
//       });
//
//       console.log('📥 Store payment response status:', response.status);
//
//       if (!response.ok) {
//         const errorText = await response.text();
//         throw new Error(`Failed to store payment: ${response.status} - ${errorText}`);
//       }
//
//       const result = await response.json();
//       console.log('✅ Payment stored via API:', result);
//       return result;
//
//     } catch (error) {
//       console.error('❌ Error storing payment via API:', error);
//       throw error;
//     }
//   };
//
//   // Function to store failed payment via backend API
//   const storeFailedPaymentViaAPI = async (failedPaymentData: any) => {
//     try {
//       const response = await fetch(`${API_BASE_URL}/payments/store-failed-payment`, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(failedPaymentData),
//       });
//
//       if (response.ok) {
//         console.log('📝 Failed payment logged via API');
//       }
//     } catch (error) {
//       console.error('❌ Failed to log failed payment via API:', error);
//     }
//   };
//
//   // Verify payment on your backend
//   const verifyPayment = async (paymentData: any) => {
//     console.log('🔐 Verifying payment:', paymentData);
//
//     try {
//       const response = await fetch(`${API_BASE_URL}/payments/verify`, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(paymentData),
//       });
//
//       console.log('📥 Verification response status:', response.status);
//
//       if (response.ok) {
//         const verificationResult = await response.json();
//         console.log('✅ Payment verified successfully:', verificationResult);
//       } else {
//         const errorText = await response.text();
//         console.error('❌ Payment verification failed:', errorText);
//       }
//     } catch (error) {
//       console.error('❌ Payment verification error:', error);
//     } finally {
//       // Reset loading states after verification attempt
//       setIsLoading(false);
//       setLoadingPlanIndex(null);
//     }
//   };
//
//   return (
//     <div className="w-full md:items-center md:justify-center bg-black/[0.96] antialiased bg-grid-white/[0.02] relative overflow-hidden">
//       <div className="flex items-center justify-center flex-col">
//         <div className="font-hnm text-[#dc2626] text-5xl pb-10 md:pb-20 px-6 text-center bg-clip-text bg-gradient-to-b bg-opacity-50">
//           Simple Pricing <br /> Choose your plan
//         </div>
//
//         {/* 🧪 DEBUG SECTION - Remove this in production */}
//         {/* {process.env.NODE_ENV === 'development' && (
//           <div className="mb-8 p-4 bg-yellow-900 border border-yellow-600 rounded-lg max-w-md">
//             <h3 className="text-yellow-200 font-bold mb-2">Debug Info</h3>
//             <p className="text-yellow-100 text-sm">User: {user ? `${user.email} (${user.uid})` : 'Not logged in'}</p>
//             <p className="text-yellow-100 text-sm">Auth token: {typeof window !== 'undefined' && localStorage.getItem('authToken') ? 'Present' : 'Missing'}</p>
//             <button
//               onClick={testLogin}
//               className="mt-2 px-3 py-1 bg-yellow-600 text-black rounded text-sm"
//             >
//               Test Backend Login
//             </button>
//           </div>
//         )} */}
//
//         {/* 🔥 NEW: Loading indicator for purchase history */}
//         {user?.email && !purchasesLoaded && (
//           <div className="mb-6 flex items-center text-yellow-400">
//             <svg className="animate-spin -ml-1 mr-3 h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
//               <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
//               <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
//             </svg>
//             Loading your purchase history...
//           </div>
//         )}
//
//         <div className="grid md:grid-cols-3 gap-6 px-6 md:w-4/5 2xl:w-3/4 cursor-pointer pb-20 items-start">
//           {plans.map((plan, index) => (
//             <div
//               key={plan.name}
//               className="h-full font-hnm text-[#dc2626] flex flex-col justify-between border rounded-3xl px-6"
//             >
//               <div className={plan.style}>
//                 <div className="text-4xl flex text-[#dc2626] items-center">
//                   {plan.name}
//                   {/* 🔥 UPDATED: Show purchased indicator with improved styling */}
//                   {isPlanPurchased(plan.name, plan.type) && (
//                     <span className="ml-2 text-sm bg-green-500 text-white px-2 py-1 rounded-full flex items-center">
//                       <PiCheckCircleFill className="mr-1" size={12} />
//                       Purchased
//                     </span>
//                   )}
//                 </div>
//                 <div className="text-3xl pt-6">₹{plan.price}</div>
//                 <div className="py-6">{plan.description}</div>
//
//                 <ul>
//                   {plan.features.map((feature) => (
//                     <li
//                       key={feature}
//                       className="text-lg py-2 flex space-x-2 items-center"
//                     >
//                       <PiCheckCircleFill className="text-green-600 mr-2 text-xl" />
//                       {feature}
//                     </li>
//                   ))}
//                 </ul>
//               </div>
//
//               <div className="mb-4">
//                 <button
//                   onClick={() => {
//                     console.log(`🖱️ Button clicked for plan ${index}:`, plan.name);
//                     handlePayment(plan);
//                   }}
//                   disabled={
//                   (isLoading && loadingPlanIndex === index) ||
//                   isPlanPurchased(plan.name, plan.type) ||
//                   Boolean(user?.email && !purchasesLoaded) // ✅ Fixed
//   }
//                   className={`rounded-3xl py-2 text-white w-full mx-auto flex justify-center items-center transition-all duration-200 ${
//                     isPlanPurchased(plan.name, plan.type)
//                       ? 'bg-green-500 cursor-not-allowed'
//                       : (user?.email && !purchasesLoaded)
//                       ? 'bg-yellow-500 cursor-not-allowed'
//                       : isLoading && loadingPlanIndex === index
//                       ? 'bg-gray-500 cursor-not-allowed'
//                       : index === 2
//                       ? 'bg-gradient-to-r from-purple-500 to-blue-300 hover:from-purple-600 hover:to-blue-400'
//                       : index <= 1
//                       ? 'bg-gradient-to-r from-emerald-500 to-blue-300 hover:from-emerald-600 hover:to-blue-400'
//                       : 'bg-gradient-to-r from-purple-500 to-blue-300 hover:from-purple-600 hover:to-blue-400'
//                   }`}
//                 >
//                   {isPlanPurchased(plan.name, plan.type) ? (
//                     <span className="flex items-center">
//                       <PiCheckCircleFill className="mr-2" />
//                       Already Purchased
//                     </span>
//                   ) : (user?.email && !purchasesLoaded) ? (
//                     <span className="flex items-center">
//                       <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
//                         <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
//                         <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
//                       </svg>
//                       Loading...
//                     </span>
//                   ) : isLoading && loadingPlanIndex === index ? (
//                     <span className="flex items-center">
//                       <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
//                         <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
//                         <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
//                       </svg>
//                       Processing...
//                     </span>
//                   ) : (
//                     plan.button
//                   )}
//                 </button>
//               </div>
//             </div>
//           ))}
//         </div>
//
//         {/* 🔥 NEW: Debug info for development */}
//         {process.env.NODE_ENV === 'development' && user?.email && (
//           <div className="mt-8 p-4 bg-gray-800 rounded-lg text-white text-sm max-w-2xl">
//             <h3 className="font-bold mb-2">Debug Info:</h3>
//             <p>User Email: {user.email}</p>
//             <p>Purchases Loaded: {purchasesLoaded.toString()}</p>
//             <p>Purchased Plans Count: {purchasedPlans.length}</p>
//             {purchasedPlans.length > 0 && (
//               <div className="mt-2">
//                 <p className="font-semibold">Purchased Plans:</p>
//                 <ul className="list-disc list-inside">
//                   {purchasedPlans.map((plan, idx) => (
//                     <li key={idx}>{plan.planName} ({plan.planType})</li>
//                   ))}
//                 </ul>
//               </div>
//             )}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };
//
// // Export the registration page directly (no authentication guard)
// export default RegistrationPage;

"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";

type Pass = {
  index: number;
  name: string;
  price: string;
  description: string;
  features: string[];
  button: string;
  link: string;
};

const passes: Record<string, Pass[]> = {
  "Day 1": [
    {
      index: 0,
      name: "GENERAL",
      price: "₹100",
      description:
        "The General Pass gives you access to the heart of Hikari no Matsuri! Join us for two days of anime quizzes, ninja runs, art, and cultural exchange perfect for all Japanese culture enthusiasts.",
      features: [
        "Canvas Painting – Strokes of HnM ",
        "Akihabara no Quest – Anime Quiz ",
        "O-Talku Zone! – Talk and Interact Area",
        "Obstacle Course – Nihon Ninja Run",
        "Hanetsuki ",
        "Musical Performance – Notes of Nippon",
        "Artist Alley ",
        "Digital Certificate of Participation",
      ],
      button: "BUY NOW",
      link: "https://pages.razorpay.com/hnmgeneral",
    },
    {
      index: 1,
      name: "PREMIUM",
      price: "₹200",
      description:
        "Unlock the full experience of Hikari no Matsuri with our Premium Pass. Exclusive workshops, VIP access, and special merch. For the true Nihon enthusiast!",
      features: [
        "All General Pass Events",
        "Exclusive Access to Yukata Experience – Dress Like a Native ",
        "Shodō – Japanese Calligraphy Workshop ",
        "VIP Seat Access for Cultural Shows & Performances",
        "Custom Event Badge & Premium Merchandise",
        "Digital Certificate of Premium Participation",
      ],
      button: "BUY NOW",
      link: "https://rzp.io/rzp/hnmpremium",
    },
    {
      index: 2,
      name: "WORKSHOPS & ADD-ONS",
      price: "₹300",
      description:
        "Enhance your Hikari no Matsuri experience by enrolling in our exclusive workshops. Hands-on learning and cultural immersion from professionals.",
      features: [
        "Includes General & Premium Pass Features",
        "Kendo Workshop",
        "Origami & Japanese Crafts",
        "Japanese Calligraphy (Shodō)",
        "Participation Certificate for Each Workshop",
        "Expert-led Sessions",
        "Materials Provided On-site",
        "Limited Slots Available per Workshop",
      ],
      button: "CONTACT US",
      link: "https://rzp.io/rzp/hnmworkshop",
    },
  ],
  "Day 2": [
    {
      index: 0,
      name: "GENERAL",
      price: "₹100",
      description:
        "Same General benefits carry over with focus on quizzes, performances, and artist showcases for Day 2.",
      features: [
        "Akihabara no Quest – Anime Quiz",
        "O-Talku Zone!",
        "Musical Performance – Notes of Nippon",
        "Artist Alley",
        "Digital Certificate of Participation",
      ],
      button: "BUY NOW",
      link: "https://rzp.io/rzp/hnmgeneralday2",
    },
    {
      index: 1,
      name: "PREMIUM",
      price: "₹200",
      description:
        "Full access to Day 2 events plus exclusive cultural perks and workshops.",
      features: [
        "All General Pass Events",
        "Yukata Experience – Dress Like a Native",
        "Shodō – Japanese Calligraphy Workshop",
        "Premium Badge & VIP Seating",
        "Certificate of Premium Participation",
      ],
      button: "BUY NOW",
      link: "https://rzp.io/rzp/hnmpremiumday2",
    },
    {
      index: 2,
      name: "WORKSHOPS & ADD-ONS",
      price: "₹300",
      description:
        "Cultural depth and skill-building through immersive workshops with limited access.",
      features: [
        "Includes General & Premium Pass Features",
        "Calligraphy & Origami Sessions",
        "Limited Workshop Slots",
        "Materials Provided On-site",
        "Workshop Certificates",
      ],
      button: "CONTACT US",
      link: "https://rzp.io/rzp/hnmworkshop",
    },
  ],

  Combo: [
    {
      index: 0,
      name: "GENERAL",
      price: "₹150",
      description:
        "Same General benefits carry over with focus on quizzes, performances, and artist showcases for Day 2.",
      features: [
        "Akihabara no Quest – Anime Quiz",
        "O-Talku Zone!",
        "Musical Performance – Notes of Nippon",
        "Artist Alley",
        "Digital Certificate of Participation",
      ],
      button: "BUY NOW",
      link: "https://rzp.io/rzp/generalcombo",
    },
    {
      index: 1,
      name: "PREMIUM",
      price: "₹250",
      description:
        "Full access to Day 2 events plus exclusive cultural perks and workshops.",
      features: [
        "All General Pass Events",
        "Yukata Experience – Dress Like a Native",
        "Shodō – Japanese Calligraphy Workshop",
        "Premium Badge & VIP Seating",
        "Certificate of Premium Participation",
      ],
      button: "BUY NOW",
      link: "https://rzp.io/rzp/hnmpremiumcombo",
    },
  ],
};

export default function Registration() {
  const [day, setDay] = useState<"Day 1" | "Day 2" | "Combo">("Combo");

  return (
    <div className="bg-black text-white px-6 py-10 font-hnm min-h-screen">
      <h1 className="text-center text-4xl md:text-5xl font-bold text-red-600 mb-10 tracking-wider">
        CHOOSE YOUR PLAN
      </h1>

      {/* Day Toggle Buttons */}
      <div className="flex justify-center mb-10 gap-4">
        {["Day 1", "Day 2", "Combo"].map((d) => (
          <button
            key={d}
            onClick={() => setDay(d as "Day 1" | "Day 2" | "Combo")}
            className={`px-6 py-2 rounded-full border-2 font-semibold ${
              day === d
                ? "bg-red-600 text-white border-red-600"
                : "text-gray-300 border-gray-600 hover:bg-gray-800"
            }`}
          >
            {d}
          </button>
        ))}
      </div>

      {/* Pass Cards */}
      <div className="grid md:grid-cols-3 gap-6 max-w-7xl mx-auto">
        {passes[day].map((pass) => (
          <motion.div
            key={pass.index}
            whileHover={{ scale: 1.02 }}
            className="border border-gray-500 rounded-3xl p-6 flex flex-col justify-between bg-[#111111]"
          >
            <div>
              <h2 className="text-2xl font-bold text-red-600 mb-2 uppercase tracking-wider">
                {pass.name}
              </h2>
              <p className="text-lg font-semibold mb-4">{pass.price}</p>
              <p className="text-sm text-gray-300 mb-5">{pass.description}</p>
              <ul className="space-y-2 text-sm text-green-400">
                {pass.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <CheckCircle2 size={16} className="mt-[2px]" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
            <a
              href={pass.link}
              target="_blank"
              rel="noopener noreferrer"
              className={`mt-6 inline-block w-full py-2 rounded-full text-center font-bold transition ${
                pass.button === "BUY NOW"
                  ? "bg-gradient-to-r from-green-400 to-blue-500 text-black"
                  : "bg-gradient-to-r from-purple-500 to-pink-500 text-white"
              }`}
            >
              {pass.button}
            </a>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
