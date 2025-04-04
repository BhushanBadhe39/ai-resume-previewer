
import React, { createContext, useContext, useState, useEffect } from "react";
import { useAuth } from "./AuthContext";

interface Education {
  id: string;
  institution: string;
  degree: string;
  fieldOfStudy: string;
  startDate: string;
  endDate: string;
  location: string;
}

interface Experience {
  id: string;
  company: string;
  position: string;
  location: string;
  startDate: string;
  endDate: string;
  description: string[];
}

interface Skill {
  id: string;
  name: string;
}

export interface ResumeData {
  personalInfo: {
    firstName: string;
    lastName: string;
    jobTitle: string;
    address: string;
    phone: string;
    email: string;
    summary: string;
  };
  experiences: Experience[];
  education: Education[];
  skills: Skill[];
}

interface ResumeContextType {
  resumeData: ResumeData;
  updatePersonalInfo: (field: string, value: string) => void;
  addExperience: () => void;
  updateExperience: (id: string, field: string, value: string | string[]) => void;
  removeExperience: (id: string) => void;
  addEducation: () => void;
  updateEducation: (id: string, field: string, value: string) => void;
  removeEducation: (id: string) => void;
  addSkill: () => void;
  updateSkill: (id: string, value: string) => void;
  removeSkill: (id: string) => void;
  addExperienceBullet: (experienceId: string) => void;
  updateExperienceBullet: (experienceId: string, index: number, value: string) => void;
  removeExperienceBullet: (experienceId: string, index: number) => void;
}

const defaultResumeData: ResumeData = {
  personalInfo: {
    firstName: "",
    lastName: "",
    jobTitle: "",
    address: "",
    phone: "",
    email: "",
    summary: ""
  },
  experiences: [],
  education: [],
  skills: []
};

const ResumeContext = createContext<ResumeContextType | undefined>(undefined);

export const useResume = () => {
  const context = useContext(ResumeContext);
  if (!context) {
    throw new Error("useResume must be used within a ResumeProvider");
  }
  return context;
};

export const ResumeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useAuth();
  const [resumeData, setResumeData] = useState<ResumeData>(defaultResumeData);

  // Load resume data when user changes
  useEffect(() => {
    if (user) {
      const savedData = localStorage.getItem(`resume_${user.id}`);
      if (savedData) {
        setResumeData(JSON.parse(savedData));
      } else {
        // Set some default data for new users
        setResumeData({
          ...defaultResumeData,
          personalInfo: {
            ...defaultResumeData.personalInfo,
            email: user.email || "",
            firstName: user.name?.split(" ")[0] || "",
            lastName: user.name?.split(" ").slice(1).join(" ") || ""
          }
        });
      }
    } else {
      setResumeData(defaultResumeData);
    }
  }, [user]);

  // Save resume data to localStorage whenever it changes
  useEffect(() => {
    if (user) {
      localStorage.setItem(`resume_${user.id}`, JSON.stringify(resumeData));
    }
  }, [resumeData, user]);

  const updatePersonalInfo = (field: string, value: string) => {
    setResumeData((prev) => ({
      ...prev,
      personalInfo: {
        ...prev.personalInfo,
        [field]: value
      }
    }));
  };

  const addExperience = () => {
    const newExperience: Experience = {
      id: Date.now().toString(),
      company: "",
      position: "",
      location: "",
      startDate: "",
      endDate: "",
      description: [""]
    };

    setResumeData((prev) => ({
      ...prev,
      experiences: [newExperience, ...prev.experiences]
    }));
  };

  const updateExperience = (id: string, field: string, value: string | string[]) => {
    setResumeData((prev) => ({
      ...prev,
      experiences: prev.experiences.map((exp) =>
        exp.id === id ? { ...exp, [field]: value } : exp
      )
    }));
  };

  const removeExperience = (id: string) => {
    setResumeData((prev) => ({
      ...prev,
      experiences: prev.experiences.filter((exp) => exp.id !== id)
    }));
  };

  const addExperienceBullet = (experienceId: string) => {
    setResumeData((prev) => ({
      ...prev,
      experiences: prev.experiences.map((exp) =>
        exp.id === experienceId
          ? { ...exp, description: [...exp.description, ""] }
          : exp
      )
    }));
  };

  const updateExperienceBullet = (experienceId: string, index: number, value: string) => {
    setResumeData((prev) => ({
      ...prev,
      experiences: prev.experiences.map((exp) =>
        exp.id === experienceId
          ? {
              ...exp,
              description: exp.description.map((bullet, i) =>
                i === index ? value : bullet
              )
            }
          : exp
      )
    }));
  };

  const removeExperienceBullet = (experienceId: string, index: number) => {
    setResumeData((prev) => ({
      ...prev,
      experiences: prev.experiences.map((exp) =>
        exp.id === experienceId
          ? {
              ...exp,
              description: exp.description.filter((_, i) => i !== index)
            }
          : exp
      )
    }));
  };

  const addEducation = () => {
    const newEducation: Education = {
      id: Date.now().toString(),
      institution: "",
      degree: "",
      fieldOfStudy: "",
      startDate: "",
      endDate: "",
      location: ""
    };

    setResumeData((prev) => ({
      ...prev,
      education: [newEducation, ...prev.education]
    }));
  };

  const updateEducation = (id: string, field: string, value: string) => {
    setResumeData((prev) => ({
      ...prev,
      education: prev.education.map((edu) =>
        edu.id === id ? { ...edu, [field]: value } : edu
      )
    }));
  };

  const removeEducation = (id: string) => {
    setResumeData((prev) => ({
      ...prev,
      education: prev.education.filter((edu) => edu.id !== id)
    }));
  };

  const addSkill = () => {
    const newSkill: Skill = {
      id: Date.now().toString(),
      name: ""
    };

    setResumeData((prev) => ({
      ...prev,
      skills: [...prev.skills, newSkill]
    }));
  };

  const updateSkill = (id: string, value: string) => {
    setResumeData((prev) => ({
      ...prev,
      skills: prev.skills.map((skill) =>
        skill.id === id ? { ...skill, name: value } : skill
      )
    }));
  };

  const removeSkill = (id: string) => {
    setResumeData((prev) => ({
      ...prev,
      skills: prev.skills.filter((skill) => skill.id !== id)
    }));
  };

  return (
    <ResumeContext.Provider
      value={{
        resumeData,
        updatePersonalInfo,
        addExperience,
        updateExperience,
        removeExperience,
        addEducation,
        updateEducation,
        removeEducation,
        addSkill,
        updateSkill,
        removeSkill,
        addExperienceBullet,
        updateExperienceBullet,
        removeExperienceBullet
      }}
    >
      {children}
    </ResumeContext.Provider>
  );
};
