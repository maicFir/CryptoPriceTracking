/**
 * @description 强制转换某些字段为数字类型
 */
export const convertToNumber = (obj: any, keys: string[], filter = false) => {
    keys.forEach((key) => {
      if (obj[key]) {
        obj[key] = Number(obj[key]);
      }
    });
    const ret: {
      [key: string]: number;
    } = {};
    if (filter) {
      keys.forEach((key) => {
        if (obj[key]) {
          ret[key] = obj[key];
        }
      });
      return ret;
    }
    return obj;
};
export const generateRandomString = () => {
    // 生成一个指定长度的随机十六进制字符串
    function getRandomHexString(length: number) {
      let result = "";
      const characters = "0123456789abcdef";
      const charactersLength = characters.length;
      for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
      }
      return result;
    }
  
    // 按照指定格式组合随机字符串
    const part1 = getRandomHexString(8);
    const part2 = getRandomHexString(4);
    const part3 = getRandomHexString(4);
    const part4 = getRandomHexString(4);
    const part5 = getRandomHexString(12);
    const part6 = getRandomHexString(4);
  
    const randomString = `${part1}-${part2}-${part3}-${part4}-${part5}-${part6}`;
    return randomString;
  };