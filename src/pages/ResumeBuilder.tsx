
import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Download, LogOut, Paperclip } from "lucide-react";

import PersonalInfoForm from "@/components/resume/PersonalInfoForm";
import ExperienceForm from "@/components/resume/ExperienceForm";
import EducationForm from "@/components/resume/EducationForm";
import SkillsForm from "@/components/resume/SkillsForm";
import ResumePreview from "@/components/resume/ResumePreview";
import { generatePDF } from "@/utils/pdfGenerator";

const ResumeBuilder: React.FC = () => {
  const { logout, user } = useAuth();
  const navigate = useNavigate();
  const [currentTab, setCurrentTab] = useState("personal");
  const [isDownloading, setIsDownloading] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const handleDownloadPDF = async () => {
    setIsDownloading(true);
    try {
      toast.info("Preparing your resume for download...");
      // Wait a moment to ensure the UI is updated with the toast
      await new Promise(resolve => setTimeout(resolve, 100));
      
      const success = await generatePDF('resume-preview', `resume_${user?.name || 'document'}.pdf`);
      if (success) {
        toast.success("Resume downloaded successfully!");
      } else {
        toast.error("Failed to download resume.");
      }
    } catch (error) {
      console.error("Error downloading PDF:", error);
      toast.error("An error occurred while generating the PDF.");
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm py-4 px-6">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center">
            <Paperclip className="h-6 w-6 text-resume-primary mr-2" />
            <h1 className="text-xl font-bold text-resume-dark">ResumeAI</h1>
          </div>
          <div className="flex items-center gap-4">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={handleDownloadPDF}
              disabled={isDownloading}
              className="flex items-center gap-1"
            >
              <Download className="h-4 w-4" />
              {isDownloading ? "Generating..." : "Download PDF"}
            </Button>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={handleLogout}
              className="flex items-center gap-1"
            >
              <LogOut className="h-4 w-4" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-7xl mx-auto w-full p-4 lg:p-6 flex flex-col lg:flex-row gap-6">
        {/* Left Side: Form */}
        <div className="w-full lg:w-1/2 space-y-4 bg-white p-6 rounded-lg shadow-sm">
          <Tabs value={currentTab} onValueChange={setCurrentTab} className="w-full">
            <TabsList className="grid grid-cols-4 mb-6">
              <TabsTrigger value="personal">Personal</TabsTrigger>
              <TabsTrigger value="experience">Experience</TabsTrigger>
              <TabsTrigger value="education">Education</TabsTrigger>
              <TabsTrigger value="skills">Skills</TabsTrigger>
            </TabsList>
            
            <TabsContent value="personal">
              <PersonalInfoForm />
            </TabsContent>
            
            <TabsContent value="experience">
              <ExperienceForm />
            </TabsContent>
            
            <TabsContent value="education">
              <EducationForm />
            </TabsContent>
            
            <TabsContent value="skills">
              <SkillsForm />
            </TabsContent>
          </Tabs>
          
          <div className="flex justify-between pt-4">
            <Button 
              variant="outline"
              onClick={() => {
                const tabOrder = ["personal", "experience", "education", "skills"];
                const currentIndex = tabOrder.indexOf(currentTab);
                if (currentIndex > 0) {
                  setCurrentTab(tabOrder[currentIndex - 1]);
                }
              }}
              disabled={currentTab === "personal"}
            >
              Previous
            </Button>
            <Button 
              onClick={() => {
                const tabOrder = ["personal", "experience", "education", "skills"];
                const currentIndex = tabOrder.indexOf(currentTab);
                if (currentIndex < tabOrder.length - 1) {
                  setCurrentTab(tabOrder[currentIndex + 1]);
                } else {
                  // If on the last tab, trigger download
                  handleDownloadPDF();
                }
              }}
              className="bg-resume-primary hover:bg-resume-secondary"
            >
              {currentTab === "skills" ? "Create PDF" : "Next"}
            </Button>
          </div>
        </div>
        
        {/* Right Side: Preview */}
        <div className="w-full lg:w-1/2 bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="p-4 bg-resume-primary text-white flex justify-between items-center">
            <h2 className="font-semibold">Resume Preview</h2>
            <Button 
              variant="secondary" 
              size="sm"
              onClick={handleDownloadPDF}
              disabled={isDownloading}
              className="flex items-center gap-1 bg-white text-resume-primary hover:bg-gray-100"
            >
              <Download className="h-4 w-4" />
              {isDownloading ? "Generating..." : "Download"}
            </Button>
          </div>
          <div className="h-[calc(100vh-13rem)] p-1 bg-gray-100 overflow-auto">
            <div id="resume-preview" className="w-full">
              <ResumePreview />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ResumeBuilder;
