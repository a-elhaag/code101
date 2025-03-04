import Button from "@/components/Button";

export default function Home() {
  return (
    <div style={{ padding: "20px", textAlign: "center" }}>
      <h1>Code101 Buttons</h1>
      <Button size="lg" color="black">Black Button</Button>
      <Button size="md" color="white">White Button</Button>
      <Button size="sm" color="blue">Blue Button</Button>
    </div>
  );
}
