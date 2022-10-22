// Custom Modules
import { RobotsGenerator } from './robots';

export default async function robotsGenerator() {
  // execute class for variable usage
  const robotsParser = new RobotsParser();
  if (returnType === ReturnType.console) {
    // console.log method
    return robotsParser.logFile(filePath);
  }
  if (returnType === ReturnType.browser) {
    // format array method
    const data = await robotsParser.parseFile(filePath);
    return data;
  }
  return;
}
