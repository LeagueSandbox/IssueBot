/**
* Parses an argument string into an array of arguments
* @param {string} argString - The argument string to parse
* @param {number} [argCount] - The number of arguments to extract from the string
* @param {boolean} [allowSingleQuote=true] - Whether or not single quotes should be allowed to wrap arguments,
* in addition to double quotes
* @return {string[]} The array of arguments
*/
export function parseArgs(argString, argCount, allowSingleQuote = true) {
  const re = allowSingleQuote ? /\s*(?:("|')([^]*?)\1|(\S+))\s*/g : /\s*(?:(")([^]*?)"|(\S+))\s*/g;
  const result = [];
  let match = [];
  // default: large enough to get all items
  argCount = argCount || argString.length;
  // get match and push the capture group that is not null to the result
  while(--argCount && (match = re.exec(argString))) result.push(match[2] || match[3]);
  // if text remains, push it to the array as it is, except for wrapping quotes, which are removed from it
  if(match && re.lastIndex < argString.length) {
    const re2 = allowSingleQuote ? /^("|')([^]*)\1$/g : /^(")([^]*)"$/g;
    result.push(argString.substr(re.lastIndex).replace(re2, '$2'));
  }
  return result;
}
export default parseArgs
