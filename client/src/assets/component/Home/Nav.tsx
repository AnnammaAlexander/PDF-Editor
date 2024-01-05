import {
  Navbar,
  MobileNav,
  Typography,
  IconButton,
  
  Card,
  List,
 
  
} from "@material-tailwind/react";
import { useEffect, useState } from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";

import {  useSelector } from "react-redux";
// import { setLogOut } from "../../redux/slice";
import { toast } from "react-toastify";
// import store from "../../redux/store";
import { getPdfFiles, uploadpdf } from "../../API/apiConnection/connection";
import Editor from "./Editor";
import Logout from "./Logout";
import FileList from "../pdfDocuments/FileList";

function Nav() {
  const [uploadPdf,setUploadPdf] = useState([])
  const [file, setFile] = useState<File | null>(null);
  const [pdfUrl, setPdfUrl] = useState("");
  // const { email ,name} = useSelector((store: { user: { email: string ,name:string} }) => store.user);
  const [open, setOpen] = useState(false);
  const [openDialog,setOpenDialog]=useState(false)
  // const[userEmail,setUserEmail]= useState('')
  const { email, } = useSelector(
    (store: { user: { email: string; name: string } }) => store.user
  );
  // Empty dependency array ensures that the effect runs only once after mount

  const handleOpen = () => setOpen(!open);
 const  handleOpenEditor =() =>setOpenDialog(!openDialog)
 const handleOpenDoc = () => setOpen(!open);

  const [openNav, setOpenNav] = useState(false);
  // const dispatch = useDispatch();
  // const navigate = useNavigate();


//get all pdf files
useEffect(()=>{
  getAllDocument();
},[])

const getAllDocument = async() =>{
  const response = await getPdfFiles(email)
  console.log(response);
  setUploadPdf(response)
  
}

  //upload pdf file
  const fileUpload = async () => {
    const response = await uploadpdf(file, email);
    if (response.status == "success") {
      toast.success("upload Successfully");
      handleOpenEditor();
    } else {
      toast.error("Failed to upload");
    }
  };

 //view documents
 function handleDocuments(){
  handleOpenDoc()
 }

 

  function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const newFile: File | null | undefined = e.target.files?.[0];
    if (newFile) {
      if (newFile.type === "application/pdf") {
        setFile(newFile);
        const fileUrl = URL.createObjectURL(newFile);
        setPdfUrl(fileUrl);
        handleOpen();
      } else {
        toast.error("Please Select Pdf");
      }
    }
  }

  const navList = (
    <ul className="mt-2 mb-4 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
     
      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="p-1 font-normal"
      >
        <a className="flex items-center" onClick={handleDocuments}>
          Docs
        </a>
      </Typography>
    </ul>
  );
  return (
    <div>
      <Navbar className="sticky top-0 z-10 h-max max-w-full rounded-none px-4 py-2 lg:px-8 lg:py-4">
        <div className="flex items-center justify-between text-blue-gray-900">
          <Typography
            as="a"
            href="#"
            className="mr-4 cursor-pointer py-1.5 font-medium"
          >
            PDF-EDITOR
          </Typography>
          <div className="flex items-center gap-4">
            <div className="mr-4 hidden lg:block">{navList}</div>
            <div className="flex items-center gap-x-1">
              {/* <label
                htmlFor="fileInput"
                className="cursor-pointer bg-gradient-to-r from-light-blue-500 to-light-indigo-500 text-white rounded-md px-4 py-2"
              >
                Upload
              </label>
              <input
                id="fileInput"
                type="file"
                name="pdf"
                className="hidden"
                onChange={handleFile}
              /> */}

              {/* <Button>
                <Input/>
              </Button> */}
              <Button
                variant="gradient"
                size="sm"
                className="hidden lg:inline-block"
                // onClick={signOut}
              >
                <Logout/>
                {/* <span>{name}</span> */}
              </Button>
            </div>
            <IconButton
              variant="text"
              className="ml-auto h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
              ripple={false}
              onClick={() => setOpenNav(!openNav)}
            >
              {openNav ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  className="h-6 w-6"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              )}
            </IconButton>
          </div>
        </div>
        <MobileNav open={openNav}>
          {navList}
          <div className="flex items-center gap-x-1">
          
            <Button fullWidth variant="gradient" size="sm" className="">
              {/* <span>Log Out</span> */}
              <Logout/>
            </Button>
          </div>
        </MobileNav>
      </Navbar>
      <div className="mx-auto max-w-screen-md py-12 h-[32rem] ">
        <Card className="mb-12 overflow-hidden h-[15rem] bg-green-200">
          <h1 className="h-9 mt-4" style={{ fontSize: '1.5rem' }}>DownLoad Your Pdf</h1>
          {/* <img
            alt="nature"
            className="h-[32rem] w-full object-cover object-center"
            src="https://images.unsplash.com/photo-1485470733090-0aae1788d5af?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2717&q=80"
          /> */}
          <div className="mt-10  ">
           <label
                htmlFor="fileInput"
                className=" cursor-pointer bg-gradient-to-r bg-blue-500 to-light-indigo-500 text-white rounded-md px-4 py-2 w-48"
              >
                Upload
              </label>
              <input
                id="fileInput"
                type="file"
                name="pdf"
                className="hidden"
                onChange={handleFile}
              />
              </div>
          
        </Card>
        <Dialog open={open} handler={handleOpen}>
          <DialogHeader>Edit your Pdf</DialogHeader>
          <DialogBody>
            {pdfUrl ? (
              <object
                data={pdfUrl}
                type="application/pdf"
                name="pdf"
                width="100%"
                height="100%"
              ></object>
            ) : (
              <div></div>
            )}
            <Button
              className="mt-6 bg-green-500"
              type="submit"
              fullWidth
              onClick={fileUpload}
            >
              Upload
            </Button>
          </DialogBody>
          <DialogFooter>
            <Button
              variant="text"
              color="red"
              onClick={handleOpen}
              className="mr-1"
            >
              <span>Cancel</span>
            </Button>
            {/* <Button variant="gradient" color="green" onClick={handleOpen}>
              <span>Confirm</span>
            </Button> */}
          </DialogFooter>
        </Dialog>
       
      </div>

      {/* {file !=null &&  <Main handleOpen ={handleOpen} open={open} file={file} fileUpload={fileUpload} pdfUrl={pdfUrl} /> } */}
      {file !=null && < Editor handleOpen = {handleOpenEditor} open={openDialog} pdfFile={file}  />}



















      {/* <Button onClick={handleOpen} variant="gradient">
        Open Dialog
      </Button> */}
      <Dialog open={open} size="md" handler={handleOpenDoc}>
        <DialogHeader className="flex justify-between">
          Select your Pdf
          <Button>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
</svg>
          </Button>
          </DialogHeader>
        <DialogBody className="flex flex-wrap p-1 gap-4">
        <List>
        {uploadPdf.length!=0?uploadPdf.map((uploads)=>{
          return(
            
            // <ListItem ripple={false} key={uploads} className="py-1 pr-1 pl-4 flex flex-wrap">
            //   {uploads}
            //   <ListItemSuffix className="flex flex-row gap-4">
               
            //       <Button
            //       //  onClick={()=>handlePDF(uploads)}
            //        >
            //         Select Page
            //       </Button>
            //       <Button color="red"
            //       //  onClick={()=>deletePDF(uploads)}
            //        >
            //         Delete
            //       </Button>
              
            //   </ListItemSuffix>
            // </ListItem>
          
            <FileList uploads={uploads} key={uploads} />
          )
        
          
        }):
        <Typography>No Previous Project</Typography>}
      </List>
      </DialogBody>
        
      </Dialog>
    </div>
  );
}

export default Nav;
