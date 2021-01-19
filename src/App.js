import React from 'react';
import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import ApplicantSignUp from './Components/auth/Applicant/Signup/ApplicantSignUp';
import Dashboard from './Components/dashboard/Applicant/DashBoard';
import AdminDashboard from './Components/dashboard/Admin/AdminDashBoard';
import ApplicationForm from './Components/auth/Applicant/ApplicationForm/ApplicationForm';
import LandingPage from './Components/auth/Applicant/landing/landing';
import AdminLogin from './Components/auth/Admin/adminLogin/adminLogin';
import Login from './Components/auth/Applicant/login/login';
import ForgotPassword from './Components/auth/Applicant/ForgotPassword/ForgotPassword'
import ResetPassword from './Components/auth/Applicant/ForgotPassword/ResetPassword'
import NotFound from './Components/auth/NotFound/NotFound';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Switch>
          <Route exact path="/signup" render={() => <ApplicantSignUp />} />
          <Route exact path="/applicationform" component={ApplicationForm} />
          <Route path="/applicantdashboard" component={Dashboard} />
          <Route path="/admindashboard" component={AdminDashboard} />
          <Route exact path='/' component={LandingPage} />
          <Route exact path='/admin/login' component={AdminLogin} />
          <Route exact path='/login' component={Login} />
          <Route exact path='/forgotpassword' component={ForgotPassword} />
          <Route exact path='/resetpassword' component={ResetPassword} />
          <Route path="*" component={NotFound} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
