export const storageUtils = {
    getStorage(key: string) {
      try {
        if (typeof window !== "undefined" && localStorage) {
          const value = (localStorage as any).getItem(key);
          return value ? JSON.parse(value) : null;
        }
      } catch (error) {
        console.error("获取缓存时发生错误:", error);
        return null;
      }
      return null;
    },
    setStorage(key: string, value: any) {
      try {
        if (typeof window !== "undefined" && localStorage) {
          localStorage.setItem(key, JSON.stringify(value));
        }
      } catch (error) {
        console.error("设置缓存时发生错误:", error);
      }
    },
    clear() {
      try {
        if (typeof window !== "undefined" && localStorage) {
          localStorage.clear();
        }
      } catch (error) {
        console.error("清除缓存时发生错误:", error);
      }
    },
    clearSomeKey(key?: string) {
      try {
        if (typeof window !== "undefined" && localStorage) {
          if (key) {
            const keys = Object.keys(localStorage);
            keys.forEach((item) => {
              // 如果当前键不是传入的 key，则删除
              if (item !== key) {
                localStorage.removeItem(item);
              }
            });
          } else {
            localStorage.clear();
          }
        }
      } catch (error) {
        console.error("清除缓存时发生错误:", error);
      }
    },
    remove(key: string) {
      try {
        if (typeof window !== "undefined" && localStorage) {
          localStorage.removeItem(key);
        }
      } catch (error) {
        console.error("清除缓存时发生错误:", error);
      }
    },
  };