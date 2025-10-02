import React, { useState } from "react";
import { ArrowLeft, ChevronDown, Upload } from "lucide-react"; // Correct icons are imported here
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";

const PractitionerRegistration = () => {
  // All state and handlers are correctly placed INSIDE the component.

  // --- State for OTP Flow ---
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

  const [password, setPassword] = useState("");

  // --- State for the rest of the form ---
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

  // --- Handler Functions ---

  const handleSendOtp = async (contact: string, type: "sms" | "email") => {
    if (type === "sms") setMobileError("");
    if (type === "email") setEmailError("");

    if (type === "sms" && (contact.length !== 10 || !/^\d+$/.test(contact))) {
      setMobileError("Please enter a valid 10-digit mobile number.");
      return;
    }
    if (
      type === "email" &&
      (!contact || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contact))
    ) {
      setEmailError("Please enter a valid email address.");
      return;
    }

    try {
      const apiContact = type === "sms" ? `+91${contact}` : contact;
      const response = await fetch("http://127.0.0.1:8000/api/otp/generate/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ contact: apiContact, type }),
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
      const response = await fetch("http://127.0.0.1:8000/api/otp/verify/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ contact: apiContact, otp }),
      });
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

  const handleCompleteRegistration = async () => {
    if (!isMobileVerified || !isEmailVerified) {
      alert("Please verify both your mobile and email before proceeding.");
      return;
    }
    if (password.length < 8) {
      alert("Password must be at least 8 characters long.");
      return;
    }

    const registrationData = new FormData();

    // User Account Data
    registrationData.append("username", email);
    registrationData.append("email", email);
    registrationData.append("password", password);

    // Profile Data
    registrationData.append("first_name", formData.firstName);
    registrationData.append("last_name", formData.lastName);
    registrationData.append("mobile_number", mobileNumber);
    registrationData.append("specialisation", formData.specialisation);
    registrationData.append("registration_number", formData.registrationNo);
    registrationData.append("date_of_birth", formData.dob);
    registrationData.append("current_address", formData.currentAddress);
    registrationData.append("state", formData.state);
    registrationData.append("pin_code", formData.pinCode);
    registrationData.append("permanent_address", formData.permanentAddress);

    // File Data
    if (formData.professionalPhoto) {
      registrationData.append("professional_photo", formData.professionalPhoto);
    }
    formData.degreeCertificate.forEach(file => {
      registrationData.append("degree_certificate", file);
    });

    try {
      const response = await fetch(
        "http://127.0.0.1:8000/api/register/practitioner/",
        {
          method: "POST",
          body: registrationData,
        }
      );

      if (response.ok) {
        alert("Registration Successful! Your account has been created.");
      } else {
        const errorData = await response.json();
        console.error("Registration failed:", errorData);
        alert("Registration failed. Please check the console for details.");
      }
    } catch (error) {
      console.error("An error occurred:", error);
      alert("An error occurred during registration.");
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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
  };

  const handleCheckedChange = (checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      sameAsCurrent: checked,
      permanentAddress: checked ? prev.currentAddress : "",
    }));
  };

  const handleSelectChange = (id: string, value: string) => {
    setFormData(prev => ({ ...prev, [id]: value }));
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
        {/* FIX: Changed ArrowLeftIcon to ArrowLeft */}
        <a
          href="/"
          className="inline-flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors"
        >
          <ArrowLeft className="h-4 w-4" /> Back to Home
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
              <div>
                <Label htmlFor="password">Create Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Minimum 8 characters"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="specialisation">Specialisation</Label>
                <Select
                  onValueChange={value =>
                    handleSelectChange("specialisation", value)
                  }
                  value={formData.specialisation}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select your specialisation" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Ayurveda">Ayurveda</SelectItem>
                    <SelectItem value="Yoga & Naturopathy">
                      Yoga & Naturopathy
                    </SelectItem>
                    <SelectItem value="Unani">Unani</SelectItem>
                    <SelectItem value="Siddha">Siddha</SelectItem>
                    <SelectItem value="Homoeopathy">Homoeopathy</SelectItem>
                  </SelectContent>
                </Select>
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
                    {/* FIX: Changed UploadIcon to Upload */}
                    <Upload className="mx-auto h-8 w-8 text-gray-400 mb-2" />
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
                    {/* FIX: Changed UploadIcon to Upload */}
                    <Upload className="mx-auto h-8 w-8 text-gray-400 mb-2" />
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
                  <div>
                    <Label htmlFor="state">Select State</Label>
                    <Select
                      onValueChange={value =>
                        handleSelectChange("state", value)
                      }
                      value={formData.state}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select your state" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Andhra Pradesh">
                          Andhra Pradesh
                        </SelectItem>
                        <SelectItem value="Karnataka">Karnataka</SelectItem>
                        <SelectItem value="Kerala">Kerala</SelectItem>
                        <SelectItem value="Tamil Nadu">Tamil Nadu</SelectItem>
                        <SelectItem value="Telangana">Telangana</SelectItem>
                      </SelectContent>
                    </Select>
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
                    <Checkbox
                      id="sameAsCurrent"
                      checked={formData.sameAsCurrent}
                      onCheckedChange={handleCheckedChange}
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
              onClick={handleCompleteRegistration}
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
