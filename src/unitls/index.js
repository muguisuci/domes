import { reRenderUI } from ".";
let data = {
  value: undefined,
};
function init(value) {
  data = value;
}
function useData(initValue) {
  if (!data) {
    init(initValue);
  }
  // 给外界更新值
  let update = function (value) {
    data = value;
    reRenderUI();
  };
  return [data, update];
}
export default useData;
