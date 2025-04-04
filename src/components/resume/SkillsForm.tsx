
import { useResume } from "@/contexts/ResumeContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Plus, X } from "lucide-react";

const SkillsForm: React.FC = () => {
  const { resumeData, addSkill, updateSkill, removeSkill } = useResume();
  const { skills } = resumeData;

  const handleUpdateSkill = (id: string, value: string) => {
    updateSkill(id, value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, id: string) => {
    if (e.key === 'Enter' && (e.target as HTMLInputElement).value.trim() !== '') {
      addSkill();
    }
  };

  return (
    <Card className="border-0 shadow-none">
      <CardHeader className="flex flex-row items-center justify-between px-0 pt-6">
        <div>
          <CardTitle>Skills</CardTitle>
          <CardDescription>
            Add your key skills and competencies
          </CardDescription>
        </div>
        <Button 
          variant="outline" 
          size="sm" 
          onClick={addSkill}
          className="flex items-center gap-1"
        >
          <Plus className="h-4 w-4" /> Add Skill
        </Button>
      </CardHeader>
      <CardContent className="px-0">
        <div className="flex flex-wrap gap-2 mb-4">
          {skills.filter(skill => skill.name.trim() !== "").map((skill) => (
            <Badge key={skill.id} variant="secondary" className="flex items-center gap-1 py-2 px-3">
              {skill.name}
              <Button
                variant="ghost"
                size="sm"
                onClick={() => removeSkill(skill.id)}
                className="h-4 w-4 p-0 ml-1 text-muted-foreground hover:text-foreground"
              >
                <X className="h-3 w-3" />
              </Button>
            </Badge>
          ))}
        </div>
        
        <div className="flex gap-2">
          {skills.length < 1 || skills[skills.length - 1].name.trim() !== "" ? (
            <Button 
              variant="outline" 
              onClick={addSkill}
              className="flex items-center gap-1"
            >
              <Plus className="h-4 w-4" /> Add Skill
            </Button>
          ) : (
            <div className="flex gap-2 w-full">
              <Input
                value={skills[skills.length - 1].name}
                onChange={(e) => handleUpdateSkill(skills[skills.length - 1].id, e.target.value)}
                placeholder="Enter a skill"
                className="flex-1"
                autoFocus
                onKeyDown={(e) => handleKeyDown(e, skills[skills.length - 1].id)}
              />
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => removeSkill(skills[skills.length - 1].id)}
                className="h-10 w-10 p-0 text-destructive hover:text-destructive/80"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default SkillsForm;
