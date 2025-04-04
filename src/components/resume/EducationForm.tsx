
import { useResume } from "@/contexts/ResumeContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, Trash } from "lucide-react";

const EducationForm: React.FC = () => {
  const { resumeData, addEducation, updateEducation, removeEducation } = useResume();
  const { education } = resumeData;

  return (
    <Card className="border-0 shadow-none">
      <CardHeader className="flex flex-row items-center justify-between px-0 pt-6">
        <div>
          <CardTitle>Education</CardTitle>
          <CardDescription>
            Add your educational background
          </CardDescription>
        </div>
        <Button 
          variant="outline" 
          size="sm" 
          onClick={addEducation}
          className="flex items-center gap-1"
        >
          <Plus className="h-4 w-4" /> Add Education
        </Button>
      </CardHeader>
      <CardContent className="px-0 space-y-6">
        {education.length === 0 ? (
          <div className="text-center py-4">
            <p className="text-muted-foreground mb-4">No education added yet</p>
            <Button 
              variant="outline" 
              onClick={addEducation}
              className="flex items-center gap-1 mx-auto"
            >
              <Plus className="h-4 w-4" /> Add Education
            </Button>
          </div>
        ) : (
          education.map((edu) => (
            <div key={edu.id} className="space-y-4 border p-4 rounded-md">
              <div className="flex justify-between items-start">
                <h4 className="font-medium">Education Details</h4>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => removeEducation(edu.id)}
                  className="h-8 w-8 p-0 text-destructive hover:text-destructive/80"
                >
                  <Trash className="h-4 w-4" />
                </Button>
              </div>
              <div className="space-y-2">
                <Label htmlFor={`institution-${edu.id}`}>Institution</Label>
                <Input
                  id={`institution-${edu.id}`}
                  value={edu.institution}
                  onChange={(e) => updateEducation(edu.id, "institution", e.target.value)}
                  placeholder="University/College Name"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor={`degree-${edu.id}`}>Degree</Label>
                  <Input
                    id={`degree-${edu.id}`}
                    value={edu.degree}
                    onChange={(e) => updateEducation(edu.id, "degree", e.target.value)}
                    placeholder="Bachelor's, Master's, etc."
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor={`fieldOfStudy-${edu.id}`}>Field of Study</Label>
                  <Input
                    id={`fieldOfStudy-${edu.id}`}
                    value={edu.fieldOfStudy}
                    onChange={(e) => updateEducation(edu.id, "fieldOfStudy", e.target.value)}
                    placeholder="Computer Science, Business, etc."
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor={`location-${edu.id}`}>Location</Label>
                <Input
                  id={`location-${edu.id}`}
                  value={edu.location}
                  onChange={(e) => updateEducation(edu.id, "location", e.target.value)}
                  placeholder="City, State"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor={`startDate-${edu.id}`}>Start Date</Label>
                  <Input
                    id={`startDate-${edu.id}`}
                    value={edu.startDate}
                    onChange={(e) => updateEducation(edu.id, "startDate", e.target.value)}
                    placeholder="MM/YYYY"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor={`endDate-${edu.id}`}>End Date</Label>
                  <Input
                    id={`endDate-${edu.id}`}
                    value={edu.endDate}
                    onChange={(e) => updateEducation(edu.id, "endDate", e.target.value)}
                    placeholder="MM/YYYY or Present"
                  />
                </div>
              </div>
            </div>
          ))
        )}
      </CardContent>
    </Card>
  );
};

export default EducationForm;
