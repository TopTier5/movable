import Navbar from "../components/Navbar";
import { ChevronLeft, CreditCard, ShoppingBag, User, X, Eye } from "lucide-react";
import { Upload, FileText } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { registerUser } from "../api/client.js";


export default function Register() {
  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: "",
    phoneNumber: "",
    email: "",
    ghanaCard: null,
    medicalDoc: null,
    disabilityType: "",
    assistanceDescription: "",
    employmentStatus: "",
  });

 
  const [ghanaCardFiles, setGhanaCardFiles] = useState([]);
  const [medicalDocFiles, setMedicalDocFiles] = useState([]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (files) {
      const fileArray = Array.from(files);

      if (name === 'ghanaCard') {
        const newFiles = fileArray.map(file => ({
          id: Date.now() + Math.random(),
          file,
          name: file.name,
          size: file.size,
          type: file.type,
          preview: file.type.startsWith('image/') ? URL.createObjectURL(file) : null
        }));
        setGhanaCardFiles(prev => [...prev, ...newFiles]);
        setFormData(prev => ({
          ...prev,
          [name]: fileArray.length === 1 ? fileArray[0] : fileArray
        }));
      } else if (name === 'medicalDoc') {
        const newFiles = fileArray.map(file => ({
          id: Date.now() + Math.random(),
          file,
          name: file.name,
          size: file.size,
          type: file.type,
          preview: file.type.startsWith('image/') ? URL.createObjectURL(file) : null
        }));
        setMedicalDocFiles(prev => [...prev, ...newFiles]);
        setFormData(prev => ({
          ...prev,
          [name]: fileArray.length === 1 ? fileArray[0] : fileArray
        }));
      }
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const removeFile = (fileId, fileType) => {
    if (fileType === 'ghanaCard') {
      setGhanaCardFiles(prev => {
        const fileToRemove = prev.find(f => f.id === fileId);
        if (fileToRemove?.preview) {
          URL.revokeObjectURL(fileToRemove.preview);
        }
        const updated = prev.filter(f => f.id !== fileId);


        setFormData(prevData => ({
          ...prevData,
          ghanaCard: updated.length > 0 ? (updated.length === 1 ? updated[0].file : updated.map(f => f.file)) : null
        }));

        return updated;
      });
    } else if (fileType === 'medicalDoc') {
      setMedicalDocFiles(prev => {
        const fileToRemove = prev.find(f => f.id === fileId);
        if (fileToRemove?.preview) {
          URL.revokeObjectURL(fileToRemove.preview);
        }
        const updated = prev.filter(f => f.id !== fileId);


        setFormData(prevData => ({
          ...prevData,
          medicalDoc: updated.length > 0 ? (updated.length === 1 ? updated[0].file : updated.map(f => f.file)) : null
        }));

        return updated;
      });
    }
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const FilePreview = ({ files, onRemove, fileType }) => {
    if (files.length === 0) return null;

    return (
      <div className="mt-4 space-y-3">
        <h4 className="text-sm font-medium text-gray-700">Uploaded Files:</h4>
        {files.map((file) => (
          <div key={file.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border">
            <div className="flex items-center space-x-3">
              {file.preview ? (
                <img
                  src={file.preview}
                  alt={file.name}
                  className="w-12 h-12 object-cover rounded border"
                />
              ) : (
                <div className="w-12 h-12 bg-blue-100 rounded flex items-center justify-center">
                  <FileText className="w-6 h-6 text-blue-600" />
                </div>
              )}
              <div>
                <p className="text-sm font-medium text-gray-900 truncate max-w-xs">{file.name}</p>
                <p className="text-xs text-gray-500">{formatFileSize(file.size)}</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              {file.preview && (
                <button
                  type="button"
                  onClick={() => window.open(file.preview, '_blank')}
                  className="p-1 text-gray-400 hover:text-blue-600 transition-colors"
                >
                  <Eye className="w-4 h-4" />
                </button>
              )}
              <button
                type="button"
                onClick={() => onRemove(file.id, fileType)}
                className="p-1 text-gray-400 hover:text-red-600 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    );
  };

  const nextStep = () => setStep((prev) => Math.min(prev + 1, 5));
  const prevStep = () => setStep((prev) => Math.max(prev - 1, 1));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const result = await registerUser(formData);

      console.log("Registration result:", result);

      if (result.success) {
        localStorage.setItem('authToken', result.token);
        alert("Registration successful!");
        navigate('/userpage');
      } else {
        setError(result.message || "Registration failed. Please try again.");
      }
    } catch (err) {
      console.error("Registration error:", err);
      setError(err.response?.data?.message || "Registration failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Navbar />

      <div className="bg-[#EFF7FF] flex items-center justify-center">
        <div className="min-h-screen py-10">
          <Link to="/">
            <button className="flex items-center text-sky-400 hover:text-blue-600 mb-6 transition-colors cursor-pointer">
              <ChevronLeft size={16} />
              <span className="text-sm font-semibold ml-1 cursor-pointer">Back to Home</span>
            </button>
          </Link>

          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-blue-600 mb-2">MoVable</h1>
            <p className="text-xl font-bold mb-2">Rider Registration</p>
            <span className="text-sm text-gray-800">
              Step {step} of 5 - Register for accessible transportation in Ghana
            </span>
          </div>

          <div className="max-w-2xl mx-auto p-8 shadow-lg rounded-lg bg-white">
            <form onSubmit={handleSubmit} className="space-y-6">
              {error && (
                <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
                  {error}
                </div>
              )}

              {step === 1 && (
                <>
                  <div className="flex items-center space-x-3 mb-6">
                    <User className="w-5 h-5 text-gray-800" />
                    <div>
                      <h2 className="text-xl font-semibold text-gray-800">Personal Information</h2>
                      <p className="text-gray-600 text-sm">Basic information to create your MoVable account</p>
                    </div>
                  </div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Full Name (as on Ghana Card) *</label>
                  <input
                    type="text"
                    name="fullName"
                    placeholder="Enter your fullname"
                    required
                    className="w-full border px-3 py-2 rounded-md border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    onChange={handleChange}
                  />
                  <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number *</label>
                  <input
                    type="tel"
                    name="phoneNumber"
                    placeholder="(+233 XX XXX XXXX)"
                    required
                    className="w-full border px-3 py-2 rounded-md border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    onChange={handleChange}
                  />
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email Address (Optional)</label>
                  <input
                    type="email"
                    name="email"
                    placeholder="youremail@example.com"
                    className="w-full border px-3 py-2 rounded-md border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    onChange={handleChange}
                  />
                  <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
                  <div className="relative">
                    <input
                      type="password"
                      placeholder="Enter your password"
                      className="w-full px-4 py-2 pr-12 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" />

                    <button
                      type="button"
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 cursor-pointer">
                      <Eye className="w-5 h-5" />
                    </button>
                  </div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Confirm Password</label>
                  <div className="relative">
                    <input
                      type="password"
                      placeholder="Confirm your password"
                      className="w-full px-4 py-2 pr-12 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" />

                    <button
                      type="button"
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 cursor-pointer">
                      <Eye className="w-5 h-5" />
                    </button>
                  </div>
                </>
              )}

              {step === 2 && (
                <>
                  <div className="flex items-center space-x-3 mb-6">
                    <CreditCard className="w-5 h-5 text-gray-800" />
                    <div>
                      <h2 className="text-xl font-semibold text-gray-800">Ghana Card Upload</h2>
                      <p className="text-gray-600 text-sm">Upload your Ghana Card for verification</p>
                    </div>
                  </div>
                  <label className="block font-semibold">Upload Ghana Card ID *</label>
                  <div className="border-2 border-dashed border-blue-300 rounded-lg p-12 text-center bg-gray-50">
                    <div className="flex flex-col items-center space-y-4">
                      <div className="w-16 h-16 bg-blue-100 rounded-lg flex items-center justify-center">
                        <CreditCard className="w-8 h-8 text-blue-600" />
                      </div>
                      <div>
                        <h3 className="text-lg font-medium text-gray-800 mb-2">Upload Ghana Card</h3>
                        <p className="text-gray-600 mb-4">Take clear photos of both sides of your Ghana National ID Card</p>
                      </div>

                      <div className="relative">
                        <input
                          type="file"
                          name="ghanaCard"
                          accept=".pdf,image/*"
                          required={ghanaCardFiles.length === 0}
                          onChange={handleChange}
                          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                          id="ghana-card-upload"
                          multiple
                        />
                        <label htmlFor="ghana-card-upload"
                          className="inline-flex items-center px-6 py-3 border border-blue-300 rounded-lg text-blue-600 hover:bg-blue-50 transition-colors cursor-pointer">
                          <Upload className="w-4 h-4 mr-2" />
                          Choose Files
                        </label>
                      </div>
                    </div>
                  </div>

                  <FilePreview
                    files={ghanaCardFiles}
                    onRemove={removeFile}
                    fileType="ghanaCard"
                  />

                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <div className="flex items-start space-x-3">
                      <div className="text-blue-600 font-medium text-sm">
                        Required:
                      </div>
                      <div className="text-blue-800 text-sm">
                        Your Ghana card is required for identity verification. We use OCR technology to auto-fill your information securely.
                      </div>
                    </div>
                  </div>
                </>
              )}

              {step === 3 && (
                <>
                  <div className="flex items-center space-x-3 mb-6">
                    <FileText className="w-5 h-5 text-gray-800" />
                    <div>
                      <h2 className="text-xl font-semibold text-gray-800">Medical Records</h2>
                      <p className="text-gray-600 text-sm">Upload medical documentation proving your disability</p>
                    </div>
                  </div>

                  <div className="border-2 border-dashed border-blue-300 rounded-lg p-12 text-center bg-gray-50">
                    <div className="flex flex-col items-center space-y-4">
                      <div className="w-16 h-16 bg-blue-100 rounded-lg flex items-center justify-center">
                        <FileText className="w-8 h-8 text-blue-600" />
                      </div>
                      <div>
                        <h3 className="text-lg font-medium text-gray-800 mb-2">Medical Disability Records</h3>
                        <p className="text-gray-600 mb-4">Upload medical documentation that proves your disability (doctor's report, medical certificate, hospital records, etc.)</p>
                      </div>

                      <div className="relative">
                        <input
                          type="file"
                          name="medicalDoc"
                          accept=".pdf,image/*"
                          required={medicalDocFiles.length === 0}
                          onChange={handleChange}
                          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                          id="medical-doc-upload"
                          multiple
                        />
                        <label htmlFor="medical-doc-upload"
                          className="inline-flex items-center px-6 py-3 border border-blue-300 rounded-lg text-blue-600 hover:bg-blue-50 transition-colors cursor-pointer">
                          <Upload className="w-4 h-4 mr-2" />
                          Choose Files
                        </label>
                      </div>
                    </div>
                  </div>

                  <FilePreview
                    files={medicalDocFiles}
                    onRemove={removeFile}
                    fileType="medicalDoc"
                  />

                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <div className="flex items-start space-x-3">
                      <div className="text-blue-600 font-medium text-sm">
                        Privacy & Security:
                      </div>
                      <div className="text-blue-800 text-sm">
                        All medical records are encrypted and stored securely. Only authorized personnel will review these documents for verification.
                      </div>
                    </div>
                  </div>
                </>
              )}

              {step === 4 && (
                <>
                  <div className="flex items-center space-x-3 mb-6">
                    <User className="w-5 h-5 text-gray-800" />
                    <div>
                      <h2 className="text-xl font-semibold text-gray-800">Assistance Needs</h2>
                      <p className="text-gray-600 text-sm">Describe any assistance you need during rides</p>
                    </div>
                  </div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Type of Disability *</label>
                  <select
                    name="disabilityType"
                    required
                    onChange={handleChange}
                    className="w-full cursor-pointer border px-3 py-2 rounded-md border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Select your disability type</option>
                    <option value="wheelchair">Mobility (Wheelchair User)</option>
                    <option value="walking-aid">Mobility (Walking aid User)</option>
                    <option value="blind">Visual impairment (Blind)</option>
                    <option value="low-vision">Visual impairment (Low vision)</option>
                    <option value="deaf">Hearing impairment (Deaf)</option>
                    <option value="cognitive">Cognitive Disability</option>
                    <option value="multiple">Multiple Disabilities</option>
                    <option value="other">Other</option>
                  </select>

                  <label className="block text-sm font-medium text-gray-700 mb-1">Describe Assistance Needed*</label>
                  <textarea
                    name="assistanceDescription"
                    required
                    placeholder="Please describe in detail any assistance you need during rides. example: I use a wheelchair and need help from the driver transfering from wheelchair to seat"
                    onChange={handleChange}
                    className="w-full cursor-pointer border px-3 py-2 rounded-md border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 h-40"
                  />

                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <p className="text-sm text-blue-600 mt-2">
                      Common Assistance Examples:
                      <ul className="list-disc ml-5">
                        <li>Wheelchair ramp or lift access</li>
                        <li>Driver assistance with mobility</li>
                        <li>Guide dog accommodation</li>
                        <li>Clear route communication</li>
                        <li>Seatbelt extensions</li>
                      </ul>
                    </p>
                  </div>
                </>
              )}

              {step === 5 && (
                <>
                  <div className="flex items-center space-x-3 mb-6">
                    <ShoppingBag className="w-5 h-5 text-gray-800" />
                    <div>
                      <h2 className="text-xl font-semibold text-gray-800">Employment Status (optional)</h2>
                      <p className="text-gray-600 text-sm">Employment information helps us provide appropriate support</p>
                    </div>
                  </div>
                  <label className="block font-semibold"></label>
                  <select
                    name="employmentStatus"
                    required
                    onChange={handleChange}
                    className="w-full cursor-pointer border px-3 py-2 rounded-md border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Select your employment status</option>
                    <option value="employed">I am currently employed</option>
                    <option value="unemployed">I am currently unemployed</option>
                  </select>

                  <p className="text-sm text-gray-600 mt-1">
                    This helps us determine subsidy eligibility. Your info is kept confidential.
                  </p>
                </>
              )}

              <div className="flex justify-between pt-4">
                {step > 1 && (
                  <button
                    type="button"
                    onClick={prevStep}
                    className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 cursor-pointer"
                  >
                    Previous
                  </button>
                )}
                {step < 5 && (
                  <button
                    type="button"
                    onClick={nextStep}
                    className="ml-auto px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 cursor-pointer"
                  >
                    Next
                  </button>
                )}
                {step === 5 && (
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="ml-auto px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 cursor-pointer disabled:opacity-50"
                  >
                    {isLoading ? 'Submitting...' : 'Submit'}
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}