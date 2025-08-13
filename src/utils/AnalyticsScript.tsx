import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCodeTags } from "../features/code-tags";
import { RootState, AppDispatch } from "../store/store";

const AnalyticsScript = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { data } = useSelector((state: RootState) => state.codeTags);

  useEffect(() => {
    dispatch(fetchCodeTags());
  }, [dispatch]);

  useEffect(() => {
    const analyticsCode = data.find((item) => item.tag.includes("Google Analitka"))?.code;
    if (analyticsCode) {
      const script = document.createElement("script");
      script.innerHTML = analyticsCode;
      document.body.appendChild(script);
    }
  }, [data]);

  return null;
};

export default AnalyticsScript;