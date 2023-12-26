import { Typography, Box, Button } from '@mui/material';
import { PrimaryTextField } from '@components/common/text-field';
import Head from 'next/head';
import React, { useEffect, useState } from 'react';
import LoginImg from '@public/assets/images/login.png';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
import { openSnackbarSuccess } from '@store/reducers/snackbar/reducers';
import { apiIdentifyAuth } from '@interfaces/apis/auth';
import { useTranslate } from '../../locales';
import { useAuthContext } from '@components/auth/hooks/use-auth-context'


export default function AuthSection() {
  const { t } = useTranslate();
  const { login, authenticated } = useAuthContext();
  const router = useRouter();
  const dispatch = useDispatch();
  const [vState, setState] = useState({ username: '', pwd: '', error: false });

  const handleUserInput = ({ key, value }: { key: string; value: string }) => {
    setState({ ...vState, [key]: value });
  };

  const handleLogin = async () => {
    try {
      await apiIdentifyAuth({ Username: vState.username, Password: vState.pwd });
      await login(vState.username, vState.pwd);
      dispatch(openSnackbarSuccess('Login Success!'));
      localStorage.setItem('username', vState.username);
      await router.push('/dashboard');
    } catch (e) {
      setState({ ...vState, username: '', pwd: '', error: true });
    }
  };

  useEffect(() => {
    if (authenticated && vState.username === '') {
      dispatch(openSnackbarSuccess('Already You are logged in!'));
      router.push('/dashboard');
    }
  }, [dispatch, authenticated, router, vState.username]);

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        height: '100vh',
        mt: 12,
      }}
    >
      <Head>
        <title>{t('app_title')}</title>
        <link rel="icon" href="/assets/images/favicon.ico" sizes="any" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Box
        sx={{
          width: { xs: '95%', md: '400px' },
          height: '500px',
          bgcolor: 'white',
          boxShadow: '1px 1px #eee',
          p: 3,
          display: 'flex',
          alignItems: 'center',
          flexDirection: 'column',
          '& .MuiTypography-root': {
            color: '#6c757ddf',
          },
        }}
      >
        <Image src={LoginImg} width={300} height={60} alt="login" />
        <Typography fontSize={16} color="#333" mt={5}>
          Sign In
        </Typography>
        <Typography sx={{ px: 4, mt: 2, fontSize: '13px', textAlign: 'center' }}>
          Enter your email address and password to access the admin panel
        </Typography>
        {vState.error ? (
          <Typography
            fontSize={14}
            sx={{
              px: 0,
              mt: 2,
              color: 'red !important',
              textAlign: 'left',
              width: '80%',
            }}
          >
            Incorrect Username or password
          </Typography>
        ) : null}
        <Box sx={{ mt: 4, width: '80%' }}>
          <Typography fontSize={14} mb={1}>
            Username
          </Typography>
          <PrimaryTextField
            placeholder="Enter your username"
            value={vState.username}
            onChange={(e) => handleUserInput({ key: 'username', value: e.target.value })}
            sx={{
              '& .MuiOutlinedInput-root': {
                bgcolor: '#fff',
                boxShadow: 'none',
                border: 'none',
              },
            }}
          />
        </Box>
        <Box sx={{ mt: 3, width: '80%' }}>
          <Box mb={1} display="flex" justifyContent="space-between">
            <Typography fontSize={14}>Password</Typography>
            <Typography fontSize={12}>Forgot password?</Typography>
          </Box>
          <PrimaryTextField
            placeholder="Enter your password"
            value={vState.pwd}
            onChange={(e) => handleUserInput({ key: 'pwd', value: e.target.value })}
            type={'password'}
            sx={{
              '& .MuiOutlinedInput-root': {
                bgcolor: '#fff',
                boxShadow: 'none',
                border: 'none',
              },
            }}
          />
        </Box>
        <Button
          onClick={handleLogin}
          sx={{
            bgcolor: '#536de6',
            color: 'white',
            px: 3,
            mt: 3,
            '&:hover': { bgcolor: '#536de6' },
          }}
        >
          Log In
        </Button>
      </Box>
    </Box>
  );
}
