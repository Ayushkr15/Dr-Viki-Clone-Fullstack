import React, { useState } from "react";

// --- Icon Components (can be moved to their own files later) ---

const ArrowLeftIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="h-4 w-4"
  >
    <path d="m12 19-7-7 7-7" />
    <path d="M19 12H5" />
  </svg>
);

const ChevronDownIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="lucide lucide-chevron-down h-4 w-4 opacity-50"
  >
    <path d="m6 9 6 6 6-6" />
  </svg>
);

const UploadIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="lucide lucide-upload mx-auto h-8 w-8 text-gray-400 mb-2"
  >
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
    <polyline points="17 8 12 3 7 8" />
    <line x1="12" x2="12" y1="3" y2="15" />
  </svg>
);

// --- Helper UI Components (can be moved to their own files later) ---

const Card = ({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) => (
  <div
    className={`text-card-foreground flex flex-col gap-6 rounded-xl border py-6 backdrop-blur-sm bg-white/90 shadow-xl ${className}`}
  >
    {children}
  </div>
);
const CardHeader = ({ children }: { children: React.ReactNode }) => (
  <div className="grid auto-rows-min items-start gap-1.5 px-6">{children}</div>
);
const CardTitle = ({ children }: { children: React.ReactNode }) => (
  <div className="font-semibold text-2xl text-green-700">{children}</div>
);
const CardDescription = ({ children }: { children: React.ReactNode }) => (
  <div className="text-muted-foreground text-sm">{children}</div>
);
const CardContent = ({ children }: { children: React.ReactNode }) => (
  <div className="px-6 space-y-6">{children}</div>
);
const CardFooter = ({ children }: { children: React.ReactNode }) => (
  <div className="px-6 pt-6">{children}</div>
);
const Label = ({
  htmlFor,
  children,
}: {
  htmlFor: string;
  children: React.ReactNode;
}) => (
  <label
    htmlFor={htmlFor}
    className="flex items-center gap-2 text-sm leading-none font-medium"
  >
    {children}
  </label>
);
const Input = (props: React.InputHTMLAttributes<HTMLInputElement>) => (
  <input
    {...props}
    className="border-input flex h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-colors outline-none file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 mt-1"
  />
);
const Button = ({
  children,
  onClick,
  disabled,
  className = "",
  variant,
}: {
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
  variant?: string;
}) => {
  const baseClasses =
    "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 shadow-xs h-9 px-4 py-2";
  const variantClasses =
    variant === "link"
      ? "bg-transparent text-blue-600 hover:underline shadow-none p-0"
      : "text-white bg-green-600 hover:bg-green-700";
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`${baseClasses} ${variantClasses} ${className}`}
    >
      {children}
    </button>
  );
};

// --- Main Practitioner Registration Component ---

const PractitionerRegistration = () => {
  // All state and logic has been moved INSIDE the component to fix bugs.
  const [mobileNumber, setMobileNumber] = useState("");
  const [mobileOtp, setMobileOtp] = useState("");
  const [isMobileOtpSent, setIsMobileOtpSent] = useState(false);
  const [isMobileVerified, setIsMobileVerified] = useState(false);
  const [mobileError, setMobileError] = useState("");

  const [email, setEmail] = useState("");
  const [emailOtp, setEmailOtp] = useState("");
  const [isEmailOtpSent, setIsEmailOtpSent] = useState(false);
  const [isEmailVerified, setIsEmailVerified] = useState(false);
  const [emailError, setEmailError] = useState("");

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    specialisation: "",
    registrationNo: "",
    dob: "",
    degreeCertificate: [] as File[],
    professionalPhoto: null as File | null,
    currentAddress: "",
    state: "",
    pinCode: "",
    permanentAddress: "",
    sameAsCurrent: false,
  });

  const handleSendOtp = async (contact: string, type: "sms" | "email") => {
    // Clear previous errors
    if (type === "sms") setMobileError("");
    if (type === "email") setEmailError("");

    // Basic validation before sending
    if (
      type === "sms" &&
      (mobileNumber.length !== 10 || !/^\d+$/.test(mobileNumber))
    ) {
      setMobileError("Please enter a valid 10-digit mobile number.");
      return;
    }
    if (
      type === "email" &&
      (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
    ) {
      setEmailError("Please enter a valid email address.");
      return;
    }

    try {
      const apiContact = type === "sms" ? `+91${contact}` : contact;

      const response = await fetch("http://127.0.0.1:8000/api/otp/generate/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ contact: apiContact, type }), // Send the formatted number
      });
      if (response.ok) {
        alert(`OTP sent to ${contact}!`);
        if (type === "sms") setIsMobileOtpSent(true);
        if (type === "email") setIsEmailOtpSent(true);
      } else {
        const err = await response.json();
        const errorMsg = err.error || "Failed to send OTP.";
        if (type === "sms") setMobileError(errorMsg);
        if (type === "email") setEmailError(errorMsg);
      }
    } catch (error) {
      console.error("Error sending OTP:", error);
      alert("An error occurred.");
    }
  };

  const handleVerifyOtp = async (
    contact: string,
    otp: string,
    type: "sms" | "email"
  ) => {
    if (type === "sms") setMobileError("");
    if (type === "email") setEmailError("");

    try {
          const apiContact = type === "sms" ? `+91${contact}` : contact;

          const response = await fetch(
            "http://127.0.0.1:8000/api/otp/verify/",
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ contact: apiContact, otp }), // Send the formatted number
            }
          );
      if (response.ok) {
        alert("Verification successful!");
        if (type === "sms") setIsMobileVerified(true);
        if (type === "email") setIsEmailVerified(true);
      } else {
        const err = await response.json();
        const errorMsg = err.error || "Invalid OTP.";
        if (type === "sms") setMobileError(errorMsg);
        if (type === "email") setEmailError(errorMsg);
      }
    } catch (error) {
      console.error("Error verifying OTP:", error);
      alert("An error occurred.");
    }
  };

  const handleMobileNumberChange = () => {
    setIsMobileOtpSent(false);
    setMobileOtp("");
    setMobileError("");
  };

  const handleEmailChange = () => {
    setIsEmailOtpSent(false);
    setEmailOtp("");
    setEmailError("");
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { id, value, type } = e.target;
    const isCheckbox = type === "checkbox";
    // Asserting the target as HTMLInputElement to access 'checked'
    const checked = isCheckbox ? (e.target as HTMLInputElement).checked : false;

    if (id === "sameAsCurrent") {
      setFormData(prev => ({
        ...prev,
        sameAsCurrent: checked,
        permanentAddress: checked ? prev.currentAddress : "",
      }));
    } else {
      setFormData(prev => ({ ...prev, [id]: value }));
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, files } = e.target;
    if (!files) return;

    if (id === "degreeCertificate") {
      setFormData(prev => ({ ...prev, [id]: Array.from(files) }));
    } else {
      setFormData(prev => ({ ...prev, [id]: files[0] || null }));
    }
  };

  return (
    <div className="bg-gray-100 p-4 md:p-8 flex flex-col items-center justify-center min-h-screen">
      <div className="w-full max-w-4xl mb-4">
        <a
          href="/"
          className="inline-flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors"
        >
          <ArrowLeftIcon /> Back to Home
        </a>
      </div>
      <div className="w-full max-w-4xl">
        <Card>
          <CardHeader>
            <CardTitle>Create Your Professional Account</CardTitle>
            <CardDescription>
              Complete the verification process to access our platform
            </CardDescription>
          </CardHeader>
          <CardContent>
            {/* --- Mobile Verification --- */}
            <div
              className={`space-y-3 p-4 border rounded-lg transition-all duration-300 ${
                isMobileVerified
                  ? "border-green-300 bg-green-50"
                  : "border-gray-200"
              }`}
            >
              <h3 className="font-semibold text-gray-800">
                1. Mobile Number Verification
              </h3>
              {isMobileVerified ? (
                <div className="flex items-center justify-between">
                  <p className="text-gray-700">{mobileNumber}</p>
                  <p className="text-sm text-green-600 font-medium">
                    ✓ Verified
                  </p>
                </div>
              ) : (
                <>
                  <div className="flex flex-col md:flex-row gap-2 items-end">
                    <div className="flex-1 w-full">
                      <Label htmlFor="mobile">Mobile Number</Label>
                      <Input
                        id="mobile"
                        placeholder="Enter 10-digit mobile number"
                        type="tel"
                        value={mobileNumber}
                        onChange={e => {
                          setMobileNumber(e.target.value);
                          setMobileError("");
                        }}
                        disabled={isMobileOtpSent}
                      />
                    </div>
                    {!isMobileOtpSent ? (
                      <Button
                        onClick={() => handleSendOtp(mobileNumber, "sms")}
                        className="w-full md:w-auto"
                      >
                        Send OTP
                      </Button>
                    ) : (
                      <Button
                        variant="link"
                        onClick={handleMobileNumberChange}
                        className="w-full md:w-auto justify-start md:justify-center"
                      >
                        Change
                      </Button>
                    )}
                  </div>
                  {isMobileOtpSent && (
                    <div className="flex flex-col md:flex-row gap-2 items-end animate-in fade-in duration-500">
                      <div className="flex-1 w-full">
                        <Label htmlFor="mobileOtp">Enter OTP</Label>
                        <Input
                          id="mobileOtp"
                          placeholder="Enter 6-digit OTP"
                          value={mobileOtp}
                          onChange={e => {
                            setMobileOtp(e.target.value);
                            setMobileError("");
                          }}
                        />
                      </div>
                      <Button
                        onClick={() =>
                          handleVerifyOtp(mobileNumber, mobileOtp, "sms")
                        }
                        className="w-full md:w-auto"
                      >
                        Verify OTP
                      </Button>
                    </div>
                  )}
                  {mobileError && (
                    <p className="text-sm text-red-600 mt-1">{mobileError}</p>
                  )}
                </>
              )}
            </div>

            {/* --- Email Verification --- */}
            <div
              className={`space-y-3 p-4 border rounded-lg transition-all duration-300 ${
                !isMobileVerified ? "opacity-50 pointer-events-none" : ""
              } ${
                isEmailVerified
                  ? "border-green-300 bg-green-50"
                  : "border-gray-200"
              }`}
            >
              <h3 className="font-semibold text-gray-800">
                2. Email Address Verification
              </h3>
              {isEmailVerified ? (
                <div className="flex items-center justify-between">
                  <p className="text-gray-700">{email}</p>
                  <p className="text-sm text-green-600 font-medium">
                    ✓ Verified
                  </p>
                </div>
              ) : (
                <>
                  <div className="flex flex-col md:flex-row gap-2 items-end">
                    <div className="flex-1 w-full">
                      <Label htmlFor="email">Email Address</Label>
                      <Input
                        id="email"
                        placeholder="Enter your email address"
                        type="email"
                        value={email}
                        onChange={e => {
                          setEmail(e.target.value);
                          setEmailError("");
                        }}
                        disabled={isEmailOtpSent}
                      />
                    </div>
                    {!isEmailOtpSent ? (
                      <Button
                        onClick={() => handleSendOtp(email, "email")}
                        className="w-full md:w-auto"
                      >
                        Send OTP
                      </Button>
                    ) : (
                      <Button
                        variant="link"
                        onClick={handleEmailChange}
                        className="w-full md:w-auto justify-start md:justify-center"
                      >
                        Change
                      </Button>
                    )}
                  </div>
                  {isEmailOtpSent && (
                    <div className="flex flex-col md:flex-row gap-2 items-end animate-in fade-in duration-500">
                      <div className="flex-1 w-full">
                        <Label htmlFor="emailOtp">Enter OTP</Label>
                        <Input
                          id="emailOtp"
                          placeholder="Enter 6-digit OTP"
                          value={emailOtp}
                          onChange={e => {
                            setEmailOtp(e.target.value);
                            setEmailError("");
                          }}
                        />
                      </div>
                      <Button
                        onClick={() =>
                          handleVerifyOtp(email, emailOtp, "email")
                        }
                        className="w-full md:w-auto"
                      >
                        Verify OTP
                      </Button>
                    </div>
                  )}
                  {emailError && (
                    <p className="text-sm text-red-600 mt-1">{emailError}</p>
                  )}
                </>
              )}
            </div>

            {/* --- Personal & Professional Info --- */}
            <div
              className={`space-y-6 p-4 border rounded-lg transition-all duration-300 ${
                !isEmailVerified ? "opacity-50 pointer-events-none" : ""
              }`}
            >
              <h3 className="font-semibold text-gray-800">
                3. Personal &amp; Professional Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="firstName">First Name</Label>
                  <Input
                    id="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                  />
                </div>
                <div>
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input
                    id="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              <div className="relative">
                <Label htmlFor="specialisation">Specialisation</Label>
                <select
                  id="specialisation"
                  value={formData.specialisation}
                  onChange={handleInputChange}
                  className="appearance-none border-input flex h-9 w-full min-w-0 rounded-md border bg-transparent pl-3 pr-8 py-1 text-base shadow-xs mt-1"
                >
                  <option>Select your specialisation</option>
                  <option>Ayurveda</option>
                  <option>Yoga & Naturopathy</option>
                  <option>Unani</option>
                  <option>Siddha</option>
                  <option>Homoeopathy</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 top-6 flex items-center px-2 text-gray-700">
                  <ChevronDownIcon />
                </div>
              </div>
              <div>
                <Label htmlFor="registrationNo">Registration Number</Label>
                <Input
                  id="registrationNo"
                  placeholder="Enter registration number (max 15 characters)"
                  value={formData.registrationNo}
                  onChange={handleInputChange}
                  maxLength={15}
                />
                <p className="text-sm text-gray-500 mt-1">
                  Maximum 15 characters
                </p>
              </div>
              <div>
                <Label htmlFor="dob">Date of Birth</Label>
                <Input
                  id="dob"
                  type="date"
                  value={formData.dob}
                  onChange={handleInputChange}
                />
              </div>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="degreeCertificate">
                    Upload Degree Certificate
                  </Label>
                  <div className="mt-1 border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                    <UploadIcon />
                    <p className="text-sm text-gray-600">
                      PDF files only. Multiple documents allowed.
                    </p>
                    <Input
                      id="degreeCertificate"
                      type="file"
                      accept=".pdf"
                      multiple
                      className="mt-2"
                      onChange={handleFileChange}
                    />
                  </div>
                  {formData.degreeCertificate.length > 0 && (
                    <div className="mt-2 text-sm text-gray-600">
                      <p className="font-medium">Selected file(s):</p>
                      <ul className="list-disc pl-5">
                        {formData.degreeCertificate.map((file, index) => (
                          <li key={index}>{file.name}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
                <div>
                  <Label htmlFor="professionalPhoto">
                    Upload Professional Photo
                  </Label>
                  <p className="text-sm font-bold text-gray-700 mt-1">
                    Please upload Professional mug-shot photograph Only
                  </p>
                  <div className="mt-2 border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                    <UploadIcon />
                    <p className="text-sm text-gray-600">
                      Image files only (JPG, PNG)
                    </p>
                    <Input
                      id="professionalPhoto"
                      type="file"
                      accept="image/*"
                      className="mt-2"
                      onChange={handleFileChange}
                    />
                  </div>
                  {formData.professionalPhoto && (
                    <div className="mt-2 text-sm text-gray-600">
                      <p className="font-medium">
                        Selected file: {formData.professionalPhoto.name}
                      </p>
                    </div>
                  )}
                </div>
              </div>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="currentAddress">Current Address</Label>
                  <Input
                    id="currentAddress"
                    placeholder="Enter your current address"
                    value={formData.currentAddress}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="relative">
                    <Label htmlFor="state">Select State</Label>
                    <select
                      id="state"
                      value={formData.state}
                      onChange={handleInputChange}
                      className="appearance-none border-input flex h-9 w-full min-w-0 rounded-md border bg-transparent pl-3 pr-8 py-1 text-base shadow-xs mt-1"
                    >
                      <option>Select your state</option>
                      <option>Andhra Pradesh</option>
                      <option>Karnataka</option>
                      <option>Kerala</option>
                      <option>Tamil Nadu</option>
                      <option>Telangana</option>
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 top-6 flex items-center px-2 text-gray-700">
                      <ChevronDownIcon />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="pinCode">PIN Code</Label>
                    <Input
                      id="pinCode"
                      placeholder="Enter 6-digit PIN code"
                      type="tel"
                      maxLength={6}
                      value={formData.pinCode}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
                <div>
                  <div className="flex items-center space-x-2 mb-2">
                    <input
                      type="checkbox"
                      id="sameAsCurrent"
                      className="size-4 rounded-[4px] border"
                      checked={formData.sameAsCurrent}
                      onChange={handleInputChange}
                    />
                    <Label htmlFor="sameAsCurrent">
                      Same as current address
                    </Label>
                  </div>
                  <Label htmlFor="permanentAddress">Permanent Address</Label>
                  <Input
                    id="permanentAddress"
                    placeholder="Enter your permanent address"
                    value={formData.permanentAddress}
                    onChange={handleInputChange}
                    disabled={formData.sameAsCurrent}
                  />
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button
              disabled={!isEmailVerified}
              className="w-full py-3 text-base"
            >
              Complete Registration
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default PractitionerRegistration;
