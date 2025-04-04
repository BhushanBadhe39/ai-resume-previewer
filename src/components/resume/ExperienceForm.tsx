
import { useResume } from "@/contexts/ResumeContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, Trash, PlusCircle } from "lucide-react";

const ExperienceForm: React.FC = () => {
  const { 
    resumeData, 
    addExperience, 
    updateExperience, 
    removeExperience,
    addExperienceBullet,
    updateExperienceBullet,
    removeExperienceBullet
  } = useResume();
  const { experiences } = resumeData;

  return (
    <Card className="border-0 shadow-none">
      <CardHeader className="flex flex-row items-center justify-between px-0 pt-6">
        <div>
          <CardTitle>Professional Experience</CardTitle>
          <CardDescription>
            Add your work experience
          </CardDescription>
        </div>
        <Button 
          variant="outline" 
          size="sm" 
          onClick={addExperience}
          className="flex items-center gap-1"
        >
          <Plus className="h-4 w-4" /> Add Job
        </Button>
      </CardHeader>
      <CardContent className="px-0 space-y-6">
        {experiences.length === 0 ? (
          <div className="text-center py-4">
            <p className="text-muted-foreground mb-4">No work experience added yet</p>
            <Button 
              variant="outline" 
              onClick={addExperience}
              className="flex items-center gap-1 mx-auto"
            >
              <Plus className="h-4 w-4" /> Add Job
            </Button>
          </div>
        ) : (
          experiences.map((experience) => (
            <div key={experience.id} className="space-y-4 border p-4 rounded-md">
              <div className="flex justify-between items-start">
                <h4 className="font-medium">Job Details</h4>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => removeExperience(experience.id)}
                  className="h-8 w-8 p-0 text-destructive hover:text-destructive/80"
                >
                  <Trash className="h-4 w-4" />
                </Button>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor={`company-${experience.id}`}>Company</Label>
                  <Input
                    id={`company-${experience.id}`}
                    value={experience.company}
                    onChange={(e) => updateExperience(experience.id, "company", e.target.value)}
                    placeholder="Company Name"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor={`position-${experience.id}`}>Position</Label>
                  <Input
                    id={`position-${experience.id}`}
                    value={experience.position}
                    onChange={(e) => updateExperience(experience.id, "position", e.target.value)}
                    placeholder="Job Title"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor={`location-${experience.id}`}>Location</Label>
                <Input
                  id={`location-${experience.id}`}
                  value={experience.location}
                  onChange={(e) => updateExperience(experience.id, "location", e.target.value)}
                  placeholder="City, State"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor={`startDate-${experience.id}`}>Start Date</Label>
                  <Input
                    id={`startDate-${experience.id}`}
                    value={experience.startDate}
                    onChange={(e) => updateExperience(experience.id, "startDate", e.target.value)}
                    placeholder="MM/YYYY"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor={`endDate-${experience.id}`}>End Date</Label>
                  <Input
                    id={`endDate-${experience.id}`}
                    value={experience.endDate}
                    onChange={(e) => updateExperience(experience.id, "endDate", e.target.value)}
                    placeholder="MM/YYYY or Present"
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <Label>Key Responsibilities & Achievements</Label>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={() => addExperienceBullet(experience.id)}
                    className="h-8 p-0 text-muted-foreground"
                  >
                    <PlusCircle className="h-4 w-4 mr-1" /> Add Point
                  </Button>
                </div>
                
                {experience.description.map((bullet, index) => (
                  <div key={index} className="flex gap-2">
                    <Textarea
                      value={bullet}
                      onChange={(e) => updateExperienceBullet(experience.id, index, e.target.value)}
                      placeholder="Describe your achievements and responsibilities"
                      className="flex-1"
                    />
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => removeExperienceBullet(experience.id, index)}
                      className="h-8 w-8 p-0 text-destructive hover:text-destructive/80 self-start mt-2"
                    >
                      <Trash className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
                
                {experience.description.length === 0 && (
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => addExperienceBullet(experience.id)}
                    className="w-full mt-2"
                  >
                    <Plus className="h-4 w-4 mr-1" /> Add Description
                  </Button>
                )}
              </div>
            </div>
          ))
        )}
      </CardContent>
    </Card>
  );
};

export default ExperienceForm;
