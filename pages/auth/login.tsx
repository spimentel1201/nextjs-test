import { NextPage } from "next";
import { GetServerSideProps } from "next";
import {
  AppBar,
  Box,
  Button,
  CardContent,
  CardMedia,
  Divider,
  IconButton,
  Toolbar,
  Typography,
} from "@mui/material";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import { useContext } from "react";
import { getSession } from "next-auth/react";
import { FormProvider, useForm, useFormContext } from "react-hook-form";

import { FormData, useLogin } from "../../hooks";
import { UIContext } from "../../context";
import {
  AuthLayout,
  CardContentAuth,
  ContainerBodyAuth,
  WrapperAuth,
  WrapperAuthBody,
  WrapperAuthHeader,
  WrapperCardAuth,
} from "../../components";
import { InputText, InputPassword } from "../../components/ui/inputs";
import { ITheme } from "../../interface";

const LoginForm = () => {
  const { onLoginUser, isLoading } = useLogin();
  const { control, handleSubmit: onSubmit } = useFormContext<FormData>();

  return (
    <>
      <CardContent sx={{ display: "flex", marginTop: "20px" }}>
        <InputText
          fullWidth
          control={control}
          label="Email"
          name="email"
          type="email"
        />
      </CardContent>
      <CardContent sx={{ display: "flex", flexDirection: "column" }}>
        <InputPassword
          fullWidth
          control={control}
          label="Contraseña"
          name="contrasena"
        />

        <Button
          fullWidth
          color="secondary"
          disabled={isLoading}
          size="large"
          sx={{ mt: 3 }}
          variant="contained"
          onClick={onSubmit(onLoginUser)}
        >
          Ingresar
        </Button>
      </CardContent>
    </>
  );
};

const LoginPage: NextPage<ITheme> = ({ toggleTheme }) => {
  const { theme, changeTheme } = useContext(UIContext);
  const { formsMethods } = useLogin();

  const handleChangeTheme = (theme: "light" | "dark") => {
    toggleTheme(theme);
    changeTheme(theme);
  };

  return (
    <AuthLayout title="Login">
      <WrapperAuth>
        <WrapperAuthHeader color="primary">
          <Box sx={{ flexGrow: 1 }}>
            <AppBar color="inherit" position="static">
              <Toolbar>
                <Typography component="div" sx={{ flexGrow: 1 }} variant="h6" />
                {theme === "dark" ? (
                  <IconButton
                    color="inherit"
                    sx={{ ml: 1 }}
                    onClick={() => handleChangeTheme("light")}
                  >
                    <Brightness7Icon />
                  </IconButton>
                ) : (
                  <IconButton
                    color="inherit"
                    sx={{ ml: 1 }}
                    onClick={() => handleChangeTheme("dark")}
                  >
                    <Brightness4Icon />
                  </IconButton>
                )}
                <IconButton color="inherit" sx={{ ml: 1 }} />
              </Toolbar>
            </AppBar>
          </Box>
        </WrapperAuthHeader>
        <WrapperAuthBody color="primary">
          <ContainerBodyAuth>
            <WrapperCardAuth>
              <CardContentAuth>
                {/* <Box sx={{ width: '100px', paddingTop: '0.1px' }}> */}
                <CardMedia
                  alt="logoMtto"
                  component="img"
                  image={`https://res.cloudinary.com/danfelogar/image/upload/v1662003403/o89ye5acl2h3ejvnry3q.png`}
                />
                {/* </Box> */}
                <CardContent>
                  <Typography
                    align="center"
                    color="secondary"
                    sx={{ fontWeight: "bold" }}
                    variant="h6"
                  >
                    Hola, bienvenido a el panel admin de mtto
                  </Typography>
                  <Typography
                    align="center"
                    color="text.disabled"
                    sx={{ fontWeight: "bold", mt: 1 }}
                    variant="body1"
                  >
                    Entre con sus credenciales a continuación
                  </Typography>
                </CardContent>
                <Divider flexItem orientation="horizontal" variant="middle" />
                <FormProvider {...formsMethods}>
                  <LoginForm />
                </FormProvider>
                <Divider flexItem orientation="horizontal" variant="middle" />
                <CardContent>
                  <Typography
                    align="center"
                    color="text.disabled"
                    sx={{ fontWeight: "bold", mt: 1, fontSize: "0.8rem" }}
                    variant="subtitle2"
                  >
                    Si no se acuerda de sus credenciales le recomendamos que se
                    comunique con un superior para informar la situación
                  </Typography>
                </CardContent>
              </CardContentAuth>
            </WrapperCardAuth>
          </ContainerBodyAuth>
        </WrapperAuthBody>
      </WrapperAuth>
    </AuthLayout>
  );
};

//con esto buscamos bloquear la pag de login en caso tal tengamos credenciales
export const getServerSideProps: GetServerSideProps = async ({
  req,
  query,
}) => {
  const session = await getSession({ req });

  //console.log({ query, session })
  //console.log({ session })
  //con el query rescatamos el ultimo path donde estuvimos navegando parar retornarlo en caso tal nuestro logueo sea exitoso
  const { p = "/" } = query;

  if (session) {
    return {
      redirect: {
        //no moleste la función ponemos para que nos devuelva un string en caso tal venga un array  colocamos.toString()
        destination: p.toString(),
        permanent: false,
      },
    };
  }

  //si nosotros no tenemos una session pues nos quedamos en esta pantalla y se devuelven las props
  return {
    props: {},
  };
};

export default LoginPage;
