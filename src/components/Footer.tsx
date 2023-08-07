import React from "react";
import "../index.css"
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';
import InstagramIcon from '@mui/icons-material/Instagram';
import TelegramIcon from '@mui/icons-material/Telegram';
import EmailIcon from '@mui/icons-material/Email';
import LanguageIcon from '@mui/icons-material/Language';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import {ReactComponent as Social} from "../assets/Social.svg";
import DialogTitle from '@mui/material/DialogTitle';
import {TransitionProps} from "@mui/material/transitions";
import {Slide} from "@mui/material";

const Transition = React.forwardRef(function Transition(
    props: TransitionProps & {
        children: React.ReactElement<any, any>;
    },
    ref: React.Ref<unknown>,
) {
    return <Slide direction="right" ref={ref} {...props} />;
});

const Footer: React.FC = () => {
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
      <>
          <div>
              <button
                  className="SocialButton"
                  onClick={handleClickOpen}
              >
                  <Social className="SocialIcon"/>
              </button>
              <Dialog
                  open={open}
                  TransitionComponent={Transition}
                  keepMounted
                  onClose={handleClose}
                  aria-describedby="alert-dialog-slide-description"
              >
                  <DialogTitle id="responsive-dialog-title">
                      {"Contact With Me"}
                  </DialogTitle>
                  <DialogContent>
                      <footer >
                      <div className="text-center marginer mb-2">
                          <a href="https://webvave.ir"><LanguageIcon sx={{fontSize:35}}/></a>
                          <a href="https://www.linkedin.com/in/ariyan-emami-8b99a3251"><LinkedInIcon sx={{fontSize:35}}/></a>
                          <a href="https://github.com/ariyan-emi"><GitHubIcon sx={{fontSize:35}}/></a>
                          <a href="https://www.instagram.com/ariyan_emi"><InstagramIcon sx={{fontSize:35}}/></a>
                          <a href="https://telegram.me/ARIYANEM231"><TelegramIcon sx={{fontSize:35}}/></a>
                          <a href="mailto:emami8637@gmail.com"><EmailIcon sx={{fontSize:35}}/></a>
                      </div>
                      <div className="text-center text-muted">
                          <h6 className="copyright-text text-center text-stone">Copyright © 2023 <a href="https://webvave.ir">WebVaVe</a> . All
                              rights
                              reserved |
                              Developed and supported by the Ariyan Emami | <a href="https://webvave.ir">WebVaVe</a></h6>
                      </div>
                      </footer>
                  </DialogContent>
                  <DialogActions>
                      <Button autoFocus onClick={handleClose}>
                          Agree
                      </Button>
                  </DialogActions>
              </Dialog>
          </div>
      </>
  );
};

export default Footer;
