"use client";

import type React from "react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Upload, FileText, X, Check, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Alert, AlertDescription } from "@/components/ui/alert";

interface UploadedFile {
  file: File;
  preview: string;
  type: "front" | "back";
}

export default function VerificationPage() {
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const [dragActive, setDragActive] = useState(false);
  const [documentType, setDocumentType] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const router = useRouter();

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFiles(e.dataTransfer.files);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      handleFiles(e.target.files);
    }
  };

  const handleFiles = (files: FileList) => {
    Array.from(files).forEach((file) => {
      if (file.type.startsWith("image/") && file.size <= 10 * 1024 * 1024) {
        const reader = new FileReader();
        reader.onload = (e) => {
          const newFile: UploadedFile = {
            file,
            preview: e.target?.result as string,
            type: uploadedFiles.length === 0 ? "front" : "back",
          };
          setUploadedFiles((prev) => [...prev, newFile]);
        };
        reader.readAsDataURL(file);
      }
    });
  };

  const removeFile = (index: number) => {
    setUploadedFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!documentType || uploadedFiles.length === 0) return;

    setIsSubmitting(true);

    try {
      const formData = new FormData();
      uploadedFiles.forEach(({ file }) => {
        formData.append("files", file);
      });
      formData.append("documentType", documentType);

      const response = await fetch("/api/verify/", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) throw new Error("Upload failed");

      const data = await response.json();
      console.log("Upload successful:", data);
      setSubmitted(true);
    } catch (error) {
      console.error(error);
      alert("There was an error submitting your documents.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="bg-gray-50 flex items-center justify-center p-4 py-20">
        <Card className="w-full max-w-md">
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="mx-auto flex items-center justify-center w-12 h-12 rounded-full bg-green-100 mb-4">
                <Check className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Documents Submitted Successfully
              </h3>
              <p className="text-sm text-gray-500 mb-6">
                Your documents have been submitted for verification. You&apos;ll
                receive an email confirmation within 24–48 hours.
              </p>
              <Button
                onClick={() => router.push("/new-leeds")}
                className="w-full"
              >
                Done
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Document Verification
          </h1>
          <p className="text-gray-600">
            Upload your government-issued ID or passport to verify your
            identity.
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Upload Your Documents</CardTitle>
            <CardDescription>
              Please upload clear, high-quality images of your identification
              documents.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="space-y-2 w-full">
                <Label htmlFor="document-type">Document Type</Label>
                <Select value={documentType} onValueChange={setDocumentType}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select document type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="passport">Passport</SelectItem>
                    <SelectItem value="drivers-license">
                      Driver&apos;s License
                    </SelectItem>
                    <SelectItem value="national-id">
                      National ID Card
                    </SelectItem>
                    <SelectItem value="state-id">State ID Card</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-4">
                <Label>Upload Documents</Label>
                <div
                  className={`relative border-2 border-dashed rounded-lg p-6 transition-colors ${
                    dragActive
                      ? "border-blue-400 bg-blue-50"
                      : "border-gray-300 hover:border-gray-400"
                  }`}
                  onDragEnter={handleDrag}
                  onDragLeave={handleDrag}
                  onDragOver={handleDrag}
                  onDrop={handleDrop}
                >
                  <input
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={handleChange}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  />
                  <div className="text-center">
                    <Upload className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                    <div className="text-sm text-gray-600">
                      <span className="font-medium text-blue-600 hover:text-blue-500">
                        Click to upload
                      </span>{" "}
                      or drag and drop
                    </div>
                    <p className="text-xs text-gray-500 mt-1">
                      PNG, JPG, JPEG up to 10MB each
                    </p>
                  </div>
                </div>
              </div>

              {uploadedFiles.length > 0 && (
                <div className="space-y-4">
                  <Label>Uploaded Documents</Label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {uploadedFiles.map((uploadedFile, index) => (
                      <div key={index} className="relative group">
                        <div className="aspect-video bg-gray-100 rounded-lg overflow-hidden">
                          <img
                            src={uploadedFile.preview || "/placeholder.svg"}
                            alt={`Document ${uploadedFile.type}`}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="absolute top-2 left-2">
                          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                            {uploadedFile.type === "front" ? "Front" : "Back"}
                          </span>
                        </div>
                        <button
                          type="button"
                          onClick={() => removeFile(index)}
                          className="absolute top-2 right-2 p-1 bg-red-100 hover:bg-red-200 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <X className="h-4 w-4 text-red-600" />
                        </button>
                        <div className="mt-2 flex items-center text-sm text-gray-500">
                          <FileText className="h-4 w-4 mr-1" />
                          {uploadedFile.file?.name}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <Alert>
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>
                  <strong>Requirements:</strong> Ensure your document is clearly
                  visible, well-lit, and all corners are shown. For two-sided
                  documents, please upload both front and back images.
                </AlertDescription>
              </Alert>

              <Button
                type="submit"
                className="w-full"
                disabled={
                  uploadedFiles.length === 0 || !documentType || isSubmitting
                }
              >
                {isSubmitting ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Processing...
                  </>
                ) : (
                  "Submit for Verification"
                )}
              </Button>
            </form>
          </CardContent>
        </Card>

        <div className="mt-8 text-center text-sm text-gray-500">
          <p>
            🔒 Your documents are encrypted and securely processed. We comply
            with all data protection regulations.
          </p>
        </div>
      </div>
    </div>
  );
}
