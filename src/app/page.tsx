import { TemperatureConverter } from './components/temperature-converter';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 sm:p-8 md:p-24">
      <div className="text-center mb-8">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground">
          TempConvert
        </h1>
        <p className="mt-2 text-lg text-muted-foreground">
          Your friendly, beautiful temperature converter.
        </p>
      </div>
      <TemperatureConverter />
    </main>
  );
}
