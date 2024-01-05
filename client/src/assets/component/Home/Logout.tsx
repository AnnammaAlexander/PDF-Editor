import {
    Button,
    Dialog,
    DialogHeader,
    
    DialogFooter,
  } from "@material-tailwind/react";
import { useState } from "react";
import { setLogOut } from "../../redux/slice";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

// import { useSelector } from "react-redux";
function Logout() {
    // const { name} = useSelector(
        // (store: { user: {  name: string } }) => store.user
    //   );
    const [open, setOpen] = useState(false);
 
    const handleOpen = () => setOpen(!open); //sign out function
    const navigate =useNavigate()
    const dispatch =useDispatch()
    const signOut = () => {
      dispatch(setLogOut());
      navigate("/");
    };

  return (
    <div>
       <Button onClick={handleOpen} >
        Logout 

      </Button>
      <Dialog open={open} handler={handleOpen}>
        <DialogHeader>Do You Want to Logout</DialogHeader>
       
        <DialogFooter>
          <Button
            variant="text"
            color="red"
            onClick={handleOpen}
            className="mr-1"
          >
            <span>Cancel</span>
          </Button>
          <Button variant="gradient" color="green" onClick={signOut}>
            <span>Confirm</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </div>
  )
}

export default Logout
