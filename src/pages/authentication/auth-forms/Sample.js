// import React from "react";
// import { useForm } from "react-hook-form";
// import { yupResolver } from "@hookform/resolvers/yup";
// import * as yup from "yup";
// import secureLocalStorage from "react-secure-storage";


// const SignupSchema = yup.object().shape({
//   select: yup.string().required("* Select a product"),
//   name: yup.string().required("* Name"),
//   fileupload: yup.mixed().test("file", "You need to provide a file", (value) => {
//     if (value.length > 0) {  
//       return true;
//     }
//     return false;
//     }),
// });

// export default function Sample() {
//   React.useEffect(()=>
//   {
//     document.getElementById("name").value = secureLocalStorage.getItem("ui_");
//   },[]);

//   const {
//     register,
//     setValue,
//     handleSubmit,
//     formState: { errors }
//   } = useForm({
//     mode: "onChange",
//     resolver: yupResolver(SignupSchema)
//   });
//   const onSubmit = (data) => {
//     console.log(JSON.stringify(data));
//   };

//   return (
//     <form onSubmit={handleSubmit(onSubmit)}>
//       <div className="mt-5">
//         {/* <label>Select</label> */}
//         <input id="name"
//         //  className={errors.select? "" : "form-control form-control-sm"} 
//          onChange={(e) => setValue('name', e.target.value, { shouldValidate: true })}
//          {...register("name")}
//          />
//         {errors.name && <p className="text-danger">{errors.name.message}</p>}

//         <input id="file" type="file"
//         //  className={errors.fileupload? "" : "form-control form-control-sm"} 
//         onChange={(e) => setValue('fileupload', e.target.value, { shouldValidate: true })} // Using setValue
//          {...register("fileupload")}
//          />
//         {errors.fileupload && <p className="text-danger">{errors.fileupload.message}</p>}


//         <select
//           {...register("select")}
//           onChange={(e) => setValue('select', e.target.value, { shouldValidate: true })} // Using setValue
//           // className={errors.select? "" : "form-select form-select-sm"}
//         >
//           <option value="">Null</option>
//           <option value="1">1</option>
//           <option value="2">2</option>
//         </select>
//         {errors.select && <p className="text-danger">{errors.select.message}</p>}
//       </div>
//       <input type="submit" />
//     </form>
//   );
// }


import * as React from "react";

// import { useForm } from "react-hook-form";
import { useFormik } from "formik";
// import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
// import CameraAltIcon from '@mui/icons-material/CameraAlt';
// import url from "routes/url";

// import { IconButton } from "@mui/material";

import Preview from "pages/components-overview/Preview";
// import secureLocalStorage from "react-secure-storage";


export default function Sample() {
  // const [franchise, setFranchiselist] = React.useState([]);
  // const [imageUrl, setImageUrl] = React.useState();
  // const [filedata, setFiledata] = useState();

  React.useLayoutEffect(() => {

    // var datareceived = secureLocalStorage.getItem("ED_");

    // let url = datareceived[9];
    // 	let filename = url.split('/').pop();
    // 	console.log (filename);

    //   document.getElementById("product_image").value = filename;
    // getBase64ImageFromUrl(datareceived[9])
    // .then(result => 
    //   // setImageUrl(result),
    //   console.log(result,"result"))
    // .catch(err => console.error(err));
  }, []);

// async function getBase64ImageFromUrl(imageUrl) {
//   var res = await fetch(imageUrl);
//   var blob = await res.blob();

//   return new Promise((resolve, reject) => {
//     var reader  = new FileReader();
//     reader.addEventListener("load", function () {
//         resolve(reader.result);
//     }, false);

//     reader.onerror = () => {
//       return reject(this);
//     };

//     console.log(reader)
//     reader.readAsDataURL(blob);

//     reader.onloadend = () => {
//       setImageUrl(reader.result);

//       console.log(reader)
//       // formik.initialValues.fileupload = reader.result;
//       document.getElementById("product_image").src = reader.result;

//       formik.values.upload = reader.result;
//   };
//   })
// }
  

  const validFileExtensions = { image: ['jpg', 'gif', 'png', 'jpeg', 'svg', 'webp'] };

  function isValidFileType(fileName, fileType) {
    return fileName && validFileExtensions[fileType].indexOf(fileName.split('.').pop()) > -1;
  }
  
  // function getAllowedExt(type) {
  //   return validFileExtensions[type].map((e) => `.${e}`).toString()
  // } 
  
  const MAX_FILE_SIZE = 102400;

  const formSchema = yup.object().shape({
    fileupload:yup
    .mixed()
    .required("Required")
    .test("is-valid-type", "Not a valid image type",
      value => isValidFileType(value && value.name.toLowerCase(), "image"))
    .test("is-valid-size", "Max allowed size is 100KB",
      value => value && value.size <= MAX_FILE_SIZE)
});

  // const {
  //   register,
  //   handleSubmit,
  //   setError,
  //   formState: { errors }
  // } = useForm();

  // const onSubmit = (data) => {
  //   alert(JSON.stringify(data));
  // };

  // const username = register("username");
  // const lastName = register("lastName");

  const formik = useFormik({
    initialValues: {
    
      fileupload:"",
    },
    validationSchema: formSchema,
    onSubmit: () => {
      //logic
      alert("hiiiiiiiiiiiiiii");
    },
  });


//   const handleFileUpload = (event) => {
//     const file = event.target.files[0];
//     // setFiledata(file);

//     formik.setFieldValue("fileupload", event.currentTarget.files[0]);

//     const reader = new FileReader();
//     reader.readAsDataURL(file);

//     reader.onloadend = () => {
//         setImageUrl(reader.result);
//     };
// };


const renderUploadButton = (formik) => {

  console.log(formik)
  // let allowedExts = getAllowedExt(inputName);
  return (<>
    <div className="button-wrap">

      <label className="button label" htmlFor="fileupload">
        <span>Upload</span>
        {/* <span className="ext">[{allowedExts}]</span> */}
      </label>
      <input
        id="product_image"
        name="fileupload"
        type="file"
        // accept={allowedExts}
        onChange={(event) => {
          formik.setFieldValue("fileupload", event.currentTarget.files[0]);
        }}

      />
      {formik.values.fileupload? (
        <Preview className={{ margin: 'auto' }} width={50} height={"auto"} file={formik.values.fileupload} />
      ) 
      : null} 
    </div>
    <div className="error" >
      {/* <ErrorMessage name="fileupload" /> */}
      {formik.touched.fileupload && formik.errors.fileupload && <p className='text-danger'>{formik.errors.fileupload}</p>}
    </div>
  </>
  )
}

  return (
    <form onSubmit={formik.handleSubmit}>
        {/* <IconButton
                                color="primary"
                                aria-label="upload picture"
                                component="label"
                            >
      <input hidden 
                                    type="file"
                                    
                                    className={formik.errors.fileupload != "" ? "errorClass form-control form-control-sm" : "form-control form-control-sm"}
                                    // value={imageUrl}
                                    id="product_image"
                                    //  error={Boolean(touched.image && errors.image)}
                                    onChange={handleFileUpload} 
                                    accept={getAllowedExt}
                                    // onChange={(event) => {
                                    //   formik.setFieldValue(inputName, event.currentTarget.files[0]);
                                    // }}
                                    />
                                <CameraAltIcon />
                                </IconButton> */}
                            {/* {imageUrl && <img name="fileupload" src={imageUrl} alt="" height="200" width="200" />} */}
                           
                            {/* {formik.values.fileupload ? (
          <Preview name="fileupload" className={{ margin: 'auto' }} width={50} height={"auto"} file={formik.values.fileupload} />
        ) : null} */}
                           
                            {/* {formik.touched.fileupload && formik.errors.fileupload && <p className="text-danger">{formik.errors.fileupload}</p>} */}


                            {renderUploadButton(formik)}


      <input value="Submit" type="submit" />
    </form>
  )
}

