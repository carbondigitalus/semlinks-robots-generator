// Custom Modules
import { RobotsGenerator } from './robots';

export default async function robotsGenerator() {
  // execute class for variable usage
  const generator = new RobotsGenerator();
  const data = await generator.generateFile();
  return data;
}
