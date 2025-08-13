import { configureStore } from '@reduxjs/toolkit';
import cronologyReducer from '../features/work-process';
import heroReducer from '../features/hero-section';
import partnersReducer from "../features/partners";
import servicesReducer from "../features/services";
import statisticsReducer from "../features/statistics";
import contactReducer from "../features/contacts";
import companyInfoReducer from "../features/company-info";
import reviewReducer from "../features/reviews";
import formReducer from '../features/form-contact';
import projectReducer from '../features/projects';
import teamReducer from '../features/team-members';
import resumeReducer from '../features/create-resume';
import projectDetail from "../features/project-detail";
import codeTagsReducer from "../features/code-tags"

export const store = configureStore({
  reducer: {
    cronology: cronologyReducer,
    hero: heroReducer,
    partners: partnersReducer,
    services: servicesReducer,
    statistics: statisticsReducer,
    contact: contactReducer,
    companyInfo: companyInfoReducer,
    review: reviewReducer,
    form: formReducer,
    projects: projectReducer,
    team: teamReducer,
    resume: resumeReducer,
    projectDetail: projectDetail,
    codeTags: codeTagsReducer,
  }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch