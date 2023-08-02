// project import
import ComponentSkeleton from './ComponentSkeleton';
import AuthWrapper from 'pages/authentication/AuthWrapper';
import ProductEntry from './ProductEntry';

// ===============================|| COMPONENT - EMPLOYEE ||=============================== //

const AddProduct = () => (
    <ComponentSkeleton>
        <AuthWrapper>
            <ProductEntry />
        </AuthWrapper>
    </ComponentSkeleton>
);

export default AddProduct;

