// project import
import ComponentSkeleton from './ComponentSkeleton';
import AuthRegister from 'pages/authentication/auth-forms/AuthRegister';
import AuthWrapper from 'pages/authentication/AuthWrapper';

// ===============================|| COMPONENT - EMPLOYEE ||=============================== //

const AddEmployee = () => (
    <ComponentSkeleton>
        <AuthWrapper>
            <AuthRegister />
        </AuthWrapper>
    </ComponentSkeleton>
);

export default AddEmployee;
