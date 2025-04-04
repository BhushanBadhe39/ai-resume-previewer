
import { useResume } from "@/contexts/ResumeContext";

const ResumePreview: React.FC = () => {
  const { resumeData } = useResume();
  const { personalInfo, experiences, education, skills } = resumeData;

  return (
    <div className="w-full h-full overflow-auto bg-white shadow-lg p-8 text-left">
      {/* Header Section */}
      <div className="border-b border-resume-accent pb-4 mb-6">
        <h1 className="text-3xl font-bold text-resume-accent mb-1">
          {personalInfo.firstName} {personalInfo.lastName}
        </h1>
        <h2 className="text-xl text-gray-700 mb-2">{personalInfo.jobTitle}</h2>
        
        <div className="flex flex-wrap justify-between text-sm text-gray-600">
          {personalInfo.address && (
            <span className="mb-1">{personalInfo.address}</span>
          )}
          <div className="flex flex-col sm:flex-row sm:gap-4">
            {personalInfo.phone && (
              <span className="mb-1">{personalInfo.phone}</span>
            )}
            {personalInfo.email && (
              <span className="mb-1">{personalInfo.email}</span>
            )}
          </div>
        </div>
      </div>

      {/* Summary Section */}
      {personalInfo.summary && (
        <div className="mb-6">
          <p className="text-gray-700 text-sm">{personalInfo.summary}</p>
        </div>
      )}

      {/* Professional Experience Section */}
      {experiences.length > 0 && (
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-resume-primary border-b border-gray-200 pb-1 mb-3">
            Professional Experience
          </h3>
          
          {experiences.map((exp) => (
            <div key={exp.id} className="mb-4">
              <div className="flex justify-between items-baseline mb-1">
                <h4 className="font-semibold">{exp.position}</h4>
                <div className="text-sm text-gray-600">
                  {exp.startDate} {exp.endDate && `- ${exp.endDate}`}
                </div>
              </div>
              
              <div className="flex justify-between items-baseline mb-2">
                <div className="font-medium text-gray-700">{exp.company}</div>
                {exp.location && (
                  <div className="text-sm text-gray-600">{exp.location}</div>
                )}
              </div>
              
              {exp.description.length > 0 && exp.description[0] !== "" && (
                <ul className="list-disc list-outside ml-5 text-sm text-gray-700 space-y-1">
                  {exp.description.map((bullet, index) => (
                    bullet.trim() !== "" && (
                      <li key={index}>{bullet}</li>
                    )
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Education Section */}
      {education.length > 0 && (
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-resume-primary border-b border-gray-200 pb-1 mb-3">
            Education
          </h3>
          
          {education.map((edu) => (
            <div key={edu.id} className="mb-4">
              <div className="flex justify-between items-baseline mb-1">
                <h4 className="font-semibold">{edu.degree} {edu.fieldOfStudy && `in ${edu.fieldOfStudy}`}</h4>
                <div className="text-sm text-gray-600">
                  {edu.startDate} {edu.endDate && `- ${edu.endDate}`}
                </div>
              </div>
              
              <div className="flex justify-between items-baseline">
                <div className="font-medium text-gray-700">{edu.institution}</div>
                {edu.location && (
                  <div className="text-sm text-gray-600">{edu.location}</div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Skills Section */}
      {skills.length > 0 && skills.some(skill => skill.name.trim() !== "") && (
        <div>
          <h3 className="text-lg font-semibold text-resume-primary border-b border-gray-200 pb-1 mb-3">
            Skills
          </h3>
          
          <div className="flex flex-wrap gap-2">
            {skills.map((skill) => (
              skill.name.trim() !== "" && (
                <span key={skill.id} className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-sm">
                  {skill.name}
                </span>
              )
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ResumePreview;
