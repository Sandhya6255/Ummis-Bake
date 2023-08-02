// project import
import ComponentSkeleton from './ComponentSkeleton';
import AuthWrapper from 'pages/authentication/AuthWrapper';
import SalesEntry from './SalesEntry';

// ===============================|| COMPONENT - EMPLOYEE ||=============================== //

const AddSales = () => (
    <ComponentSkeleton>
        <AuthWrapper>
            <SalesEntry />
        </AuthWrapper>
    </ComponentSkeleton>
);

export default AddSales;

