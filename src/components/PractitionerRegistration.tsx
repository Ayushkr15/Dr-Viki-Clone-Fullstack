import React, { useState } from "react";

// --- Icon Components ---

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

// --- Helper Components (to replicate shadcn/ui look and feel in a single file) ---

const Card = ({ children, className = "" }) => (
  <div
    className={`text-card-foreground flex flex-col gap-6 rounded-xl border py-6 backdrop-blur-sm bg-white/90 shadow-xl ${className}`}
  >
    {children}
  </div>
);

const CardHeader = ({ children }) => (
  <div className="grid auto-rows-min items-start gap-1.5 px-6">{children}</div>
);
const CardTitle = ({ children }) => (
  <div className="font-semibold text-2xl text-green-700">{children}</div>
);
const CardDescription = ({ children }) => (
  <div className="text-muted-foreground text-sm">{children}</div>
);
const CardContent = ({ children }) => (
  <div className="px-6 space-y-6">{children}</div>
);
const CardFooter = ({ children }) => (
  <div className="px-6 pt-6">{children}</div>
);

const Label = ({ htmlFor, children }) => (
  <label
    htmlFor={htmlFor}
    className="flex items-center gap-2 text-sm leading-none font-medium"
  >
    {children}
  </label>
);

const Input = ({
  id,
  type = "text",
  placeholder,
  value,
  onChange,
  disabled,
  maxLength,
}) => (
  <input
    id={id}
    type={type}
    placeholder={placeholder}
    value={value}
    onChange={onChange}
    disabled={disabled}
    maxLength={maxLength}
    className="border-input flex h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-colors outline-none file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 mt-1"
  />
);

const Button = ({ children, onClick, disabled, className = "" }) => (
  <button
    onClick={onClick}
    disabled={disabled}
    className={`inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 text-white shadow-xs h-9 px-4 py-2 bg-green-600 hover:bg-green-700 ${className}`}
  >
    {children}
  </button>
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
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
    <polyline points="17 8 12 3 7 8"></polyline>
    <line x1="12" x2="12" y1="3" y2="15"></line>
  </svg>
);

// --- Main Practitioner Registration Component ---

const PractitionerRegistration = () => {
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
    degreeCertificate: [],
    professionalPhoto: null,
    currentAddress: "",
    state: "",
    pinCode: "",
    permanentAddress: "",
    sameAsCurrent: false,
  });

  const handleInputChange = e => {
    const { id, value, type, checked } = e.target;
    if (type === "checkbox") {
      setFormData(prev => ({ ...prev, [id]: checked }));
      if (checked) {
        setFormData(prev => ({
          ...prev,
          permanentAddress: formData.currentAddress,
        }));
      } else {
        setFormData(prev => ({ ...prev, permanentAddress: "" }));
      }
    } else {
      setFormData(prev => ({ ...prev, [id]: value }));
    }
  };

  const handleFileChange = e => {
    const { id, files } = e.target;
    if (id === "degreeCertificate") {
      setFormData(prev => ({ ...prev, [id]: Array.from(files) }));
    } else {
      setFormData(prev => ({ ...prev, [id]: files[0] || null }));
    }
  };

  const handleSendMobileOtp = () => {
    setMobileError("");
    if (mobileNumber.length === 10 && /^\d+$/.test(mobileNumber)) {
      setIsMobileOtpSent(true);
    } else {
      setMobileError("Please enter a valid 10-digit mobile number.");
    }
  };

  const handleVerifyMobileOtp = () => {
    setMobileError("");
    if (mobileOtp.length > 3) {
      setIsMobileVerified(true);
    } else {
      setMobileError("Please enter a valid OTP.");
    }
  };

  const handleSendEmailOtp = () => {
    setEmailError("");
    if (email && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setIsEmailOtpSent(true);
    } else {
      setEmailError("Please enter a valid email address.");
    }
  };

  const handleVerifyEmailOtp = () => {
    setEmailError("");
    if (emailOtp.length > 3) {
      setIsEmailVerified(true);
    } else {
      setEmailError("Please enter a valid OTP.");
    }
  };

  return (
    <div className="bg-gray-100 p-4 md:p-8 flex flex-col items-center justify-center min-h-screen">
      <div className="w-full max-w-4xl mb-4">
        <a
          href="/"
          className="inline-flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors"
        >
          <ArrowLeftIcon />
          Back to Home
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
              className={`space-y-2 p-4 border rounded-lg transition-all duration-300 ${
                isMobileVerified
                  ? "border-green-300 bg-green-50/30"
                  : "border-green-200 bg-green-50/50"
              }`}
            >
              <h3 className="font-semibold text-green-800 flex items-center gap-2">
                1. Mobile Number Verification
              </h3>
              <div className="flex flex-col md:flex-row gap-2 items-start">
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
                    disabled={isMobileVerified}
                  />
                </div>
                {!isMobileOtpSent ? (
                  <Button
                    onClick={handleSendMobileOtp}
                    disabled={isMobileVerified}
                    className="mt-6"
                  >
                    Send OTP
                  </Button>
                ) : (
                  <>
                    <div className="flex-1 w-full">
                      <Label htmlFor="mobileOtp">Enter OTP</Label>
                      <Input
                        id="mobileOtp"
                        placeholder="Enter OTP"
                        value={mobileOtp}
                        onChange={e => {
                          setMobileOtp(e.target.value);
                          setMobileError("");
                        }}
                        disabled={isMobileVerified}
                      />
                    </div>
                    <Button
                      onClick={handleVerifyMobileOtp}
                      disabled={isMobileVerified}
                      className="mt-6"
                    >
                      Verify OTP
                    </Button>
                  </>
                )}
              </div>
              {mobileError && (
                <p className="text-sm text-red-600 mt-1">{mobileError}</p>
              )}
              {isMobileVerified && (
                <p className="text-sm text-green-600 font-medium mt-2">
                  ✓ Mobile Number Verified
                </p>
              )}
            </div>

            {/* --- Email Verification --- */}
            <div
              className={`space-y-2 p-4 border rounded-lg transition-all duration-300 ${
                !isMobileVerified ? "opacity-50 pointer-events-none" : ""
              } ${
                isEmailVerified
                  ? "border-green-300 bg-green-50/30"
                  : "border-green-200 bg-green-50/50"
              }`}
            >
              <h3 className="font-semibold text-green-800 flex items-center gap-2">
                2. Email Address Verification
              </h3>
              <div className="flex flex-col md:flex-row gap-2 items-start">
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
                    disabled={!isMobileVerified || isEmailVerified}
                  />
                </div>
                {!isEmailOtpSent ? (
                  <Button
                    onClick={handleSendEmailOtp}
                    disabled={isEmailVerified}
                    className="mt-6"
                  >
                    Send OTP
                  </Button>
                ) : (
                  <>
                    <div className="flex-1 w-full">
                      <Label htmlFor="emailOtp">Enter OTP</Label>
                      <Input
                        id="emailOtp"
                        placeholder="Enter OTP"
                        value={emailOtp}
                        onChange={e => {
                          setEmailOtp(e.target.value);
                          setEmailError("");
                        }}
                        disabled={isEmailVerified}
                      />
                    </div>
                    <Button
                      onClick={handleVerifyEmailOtp}
                      disabled={isEmailVerified}
                      className="mt-6"
                    >
                      Verify OTP
                    </Button>
                  </>
                )}
              </div>
              {emailError && (
                <p className="text-sm text-red-600 mt-1">{emailError}</p>
              )}
              {isEmailVerified && (
                <p className="text-sm text-green-600 font-medium mt-2">
                  ✓ Email Verified
                </p>
              )}
            </div>

            {/* --- Personal & Professional Info --- */}
            <div
              className={`space-y-6 p-4 border rounded-lg transition-all duration-300 ${
                !isEmailVerified ? "opacity-50 pointer-events-none" : ""
              } border-gray-200 bg-gray-50/50`}
            >
              <h3 className="font-semibold text-green-800 flex items-center gap-2">
                3. Personal &amp; Professional Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="firstName">First Name</Label>
                  <Input
                    id="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    disabled={!isEmailVerified}
                  />
                </div>
                <div>
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input
                    id="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    disabled={!isEmailVerified}
                  />
                </div>
              </div>
              <div className="relative">
                <Label htmlFor="specialisation">Specialisation</Label>
                <select
                  id="specialisation"
                  className="appearance-none border-input flex h-9 w-full min-w-0 rounded-md border bg-transparent pl-3 pr-8 py-1 text-base shadow-xs mt-1"
                  disabled={!isEmailVerified}
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
                  disabled={!isEmailVerified}
                  maxLength="15"
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
                  disabled={!isEmailVerified}
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
                      disabled={!isEmailVerified}
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
                      disabled={!isEmailVerified}
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
                    disabled={!isEmailVerified}
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="relative">
                    <Label htmlFor="state">Select State</Label>
                    <select
                      id="state"
                      className="appearance-none border-input flex h-9 w-full min-w-0 rounded-md border bg-transparent pl-3 pr-8 py-1 text-base shadow-xs mt-1"
                      disabled={!isEmailVerified}
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
                      maxLength="6"
                      value={formData.pinCode}
                      onChange={handleInputChange}
                      disabled={!isEmailVerified}
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
                      disabled={!isEmailVerified}
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
                    disabled={!isEmailVerified || formData.sameAsCurrent}
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
