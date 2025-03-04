import Button from "@/components/Button";

export default function HomePage() {
  return (
    <div style={{ padding: "2rem" }}>
      <Button size="lg" color="black">
        Black Button
      </Button>
      <Button size="md" color="white">
        White Button
      </Button>
      <Button size="sm" color="blue">
        Blue Button
      </Button>
    </div>
  );
}