// Custom Modules
import { ReturnType } from './options';
import { RobotsParser } from './robots';

export default async function robotsParser(returnType: `${ReturnType}`, filePath: string) {
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
