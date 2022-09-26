import * as ncp from 'copy-paste';

export default function copy(data: string) {
  return new Promise((resolve, reject) => {
    try {
      ncp.copy(data);
      resolve(data);
    } catch (e) {
      reject(e);
    }
  });
}
