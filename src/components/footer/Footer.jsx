import "./footer.css"
import logo from "../../logo-udemy-inverted.svg"
import { IconButton } from "@mui/material"
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
const Footer = () => {
  return (
    <div className='footer'>
       <IconButton sx={{color:"white"}}>
        <LibraryBooksIcon fontSize="large" />
       </IconButton>

        <p>2024 CCourses.inc</p>
    </div>
  )
}

export default Footer