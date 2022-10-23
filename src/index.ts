// Custom Modules
import { RobotsGenerator } from './robots';

export default async function robotsGenerator(outPath: string) {
  // execute class for variable usage
  const generator = new RobotsGenerator();
  const data = await generator.generateFile(outPath);
  return data;
}
