import ProjectCard from "@/components/ProjectCard";

export default function Home() {
  return (
    <main style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
      <ProjectCard
        title="Awesome Project"
        owner="Jane Doe"
        description="A cool open-source project for Code101."
        repoLink="https://github.com/username/repo"
      />
      <ProjectCard
        title="Another Project"
        owner="Team Code101"
        description="Collaboration is the key!"
        repoLink="https://github.com/another/repo"
      />
    </main>
  );
}