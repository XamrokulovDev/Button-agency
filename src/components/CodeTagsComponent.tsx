import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCodeTags } from "../features/code-tags";
import type { RootState, AppDispatch } from "../store/store";

const CodeTagsComponent = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { data } = useSelector((state: RootState) => state.codeTags);

  useEffect(() => {
    dispatch(fetchCodeTags());
  }, [dispatch]);

  return (
    <div>
      {data.map((item) => (
        <div key={item.order}>
          <h3>{item.tag}</h3>
          <pre>{item.code}</pre>
        </div>
      ))}
    </div>
  );
};

export default CodeTagsComponent;