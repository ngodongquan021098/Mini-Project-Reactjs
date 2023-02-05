import React, { useRef } from 'react';
import { Post } from '../../utils/common';
import customStyle from '../../styles/useStyles';
import EditIcon from '@mui/icons-material/Edit';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { ThemeProvider } from '@mui/material';
import { IconButton, Textarea, Input, Select, Option } from '@material-tailwind/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { StatusLearning, usePosts } from '@/hooks/pages/usePosts';
import { Button, Dialog, DialogHeader, DialogBody, DialogFooter } from '@material-tailwind/react';
import { useForm, Controller } from 'react-hook-form';
import AlertDialog from '../atoms/dialog';
import { TYPE_STATUS } from '@/constant/variable';

export interface IFormCreatePost {
  title: string;
  url: string;
  status: string;
  description: string;
}
const Posts = (): React.ReactElement => {
  const { theme } = customStyle;
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    control,
    setValue,
  } = useForm<IFormCreatePost>();
  const {
    state: {
      listPost,
      isOpenAddPostDialog,
      isOpenDeletePostDialog,
      currentStatusDialog,
      handleAddPost,
      findBackground,
      setIsOpenDialogAddPost,
      setCurrentStatusDialog,
      handleOpenAndCloseDeletePostDialog,
      handleDeletePost,
      handleSelectedPost,
      handleEditPost,
      handleSetLastElement,
    },
  } = usePosts(setValue);
  return (
    <React.Fragment>
      <div className='w-11/12 m-auto flex flex-wrap justify-start box-border'>
        {listPost.map((eachPost: Post, index: number) => (
          <div
            key={index}
            className={`w-full sm:w-[48%] mb-3 ml-[1%] md:w-[32%] transition-all duration-150 hover:scale-105 flex flex-col justify-around border-2 p-5 h-44 rounded-lg border-[${findBackground(
              eachPost.status
            )}]`}
            ref={index === listPost.length - 1 ? handleSetLastElement : null}
          >
            <div className='flex justify-between'>
              <h3 className='text-xl font-bold'>{eachPost.title}</h3>
              <div>
                <ThemeProvider theme={theme}>
                  <EditIcon
                    style={{ fill: findBackground(eachPost.status) }}
                    fontSize='medium'
                    className='cursor-pointer mr-2'
                    onClick={() => handleSelectedPost(eachPost, TYPE_STATUS.EDIT)}
                  ></EditIcon>

                  <DeleteOutlineIcon
                    style={{ fill: findBackground(eachPost.status) }}
                    fontSize='medium'
                    className='cursor-pointer'
                    onClick={() => handleSelectedPost(eachPost, TYPE_STATUS.DELETE)}
                  ></DeleteOutlineIcon>
                </ThemeProvider>
              </div>
            </div>
            <a
              className='text-blue-500 text-ellipsis overflow-hidden whitespace-nowrap underline hover:-skew-x-12 transition-all duration-150'
              target='_blank'
              rel='noopener noreferrer'
              href={eachPost.url}
            >
              {eachPost.url}
            </a>
            <div>
              <p
                className={`inline-block border-collapse border px-6 py-1 text-white rounded-xl bg-[${findBackground(
                  eachPost.status
                )}]`}
              >
                {eachPost.status}
              </p>
            </div>
            <p className='text-sm'>{eachPost.description}</p>
          </div>
        ))}
      </div>

      {/* button show open dialog add  */}
      <div className='fixed right-5 bottom-5 z-20 flex'>
        <IconButton
          onClick={() => {
            reset({ title: '', url: '', status: '', description: '' });
            setIsOpenDialogAddPost(true);
            setCurrentStatusDialog(TYPE_STATUS.ADD);
          }}
          className='bg-white border-[4px] max-w-none max-h-max border-[#7BC2B1] flex justify-center items-center rounded-full w-14 h-14 md:w-20 md:h-20'
        >
          <FontAwesomeIcon icon={faPlus} inverse className='w-full h-8 md:h-12 text-[#7BC2B1]' />
        </IconButton>
      </div>

      <Dialog
        open={isOpenAddPostDialog}
        handler={() => {
          setIsOpenDialogAddPost(false);
        }}
        animate={{
          mount: { scale: 1, y: 0 },
          unmount: { scale: 0.9, y: -100 },
        }}
        className='xl:min-w-[40%] md:min-w-[60%] min-w-[90%]'
      >
        <DialogHeader>{`${
          currentStatusDialog === TYPE_STATUS.ADD ? 'Add new' : 'Edit'
        } lession`}</DialogHeader>
        <DialogBody divider className='flex flex-col items-center'>
          <div className='w-3/4 mt-3'>
            <Input
              {...register('title', { required: true })}
              error={!!errors.title}
              label='Title'
            />
          </div>
          <div className='w-3/4 mt-5'>
            <Input {...register('url', { required: false })} label='URL' />
          </div>
          <div className='w-3/4 mt-5'>
            <Controller
              name='status'
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <Select label='Select Status' {...field} error={!!errors.status}>
                  <Option value={StatusLearning.learned}>{StatusLearning.learned}</Option>
                  <Option value={StatusLearning.toLearn}>{StatusLearning.toLearn}</Option>
                  <Option value={StatusLearning.learning}>{StatusLearning.learning}</Option>
                </Select>
              )}
            />
          </div>
          <div className='w-3/4 mt-5'>
            <Textarea {...register('description')} label='Description' />
          </div>
        </DialogBody>
        <DialogFooter>
          <Button
            variant='text'
            color='red'
            onClick={() => {
              setIsOpenDialogAddPost(false);
            }}
            className='mr-1'
          >
            <span>Cancel</span>
          </Button>
          <Button
            variant='gradient'
            color='green'
            onClick={handleSubmit(
              currentStatusDialog === TYPE_STATUS.ADD ? handleAddPost : handleEditPost
            )}
          >
            <span>Confirm</span>
          </Button>
        </DialogFooter>
      </Dialog>

      {/* dialog remove post */}
      {isOpenDeletePostDialog && (
        <AlertDialog
          title={'Confirm Delete'}
          message={'Are you sure to want to delete this post?'}
          textOk={'Ok'}
          textCancel={'Cancel'}
          handleOk={handleDeletePost}
          handleClose={() => handleOpenAndCloseDeletePostDialog(false)}
        ></AlertDialog>
      )}
    </React.Fragment>
  );
};

export default Posts;
