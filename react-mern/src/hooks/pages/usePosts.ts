import { DataPostEdit, DataPostNew } from '@/api/PostService';
import { IFormCreatePost } from '@/components/pages/Posts';
import { TYPE_STATUS } from '@/constant/variable';
import {
  addPostActions,
  deletePostActions,
  editPostActions,
  getListPostActions,
  setPagination,
} from '@/store/posts/actions';
import { Pagination } from '@/store/posts/reducer';
import { listPostsSelector, paginationSelector } from '@/store/posts/selector';
import { Post } from '@/utils/common';
import React, { useRef } from 'react';
import { UseFormSetValue } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';

export enum StatusLearning {
  toLearn = 'To learn',
  learning = 'Learning',
  learned = 'Learned',
}
type usePostsState = {
  listPost: Post[];
  isOpenAddPostDialog: boolean;
  isOpenDeletePostDialog: boolean;
  currentStatusDialog: TYPE_STATUS;
  handleAddPost: (data: DataPostNew) => void;
  findBackground: (string: string) => string;
  setIsOpenDialogAddPost: React.Dispatch<React.SetStateAction<boolean>>;
  setCurrentStatusDialog: React.Dispatch<React.SetStateAction<TYPE_STATUS>>;
  handleOpenAndCloseDeletePostDialog: (status: boolean) => void;
  handleDeletePost: () => void;
  handleSelectedPost: (post: Post, type: TYPE_STATUS) => void;
  handleEditPost: (data: DataPostNew) => void;
  handleSetLastElement: (element: HTMLDivElement) => void;
};
export const usePosts = (setValue: UseFormSetValue<IFormCreatePost>): { state: usePostsState } => {
  const dispatch = useDispatch();
  const listPost = useSelector(listPostsSelector);
  const paginationPost = useSelector(paginationSelector);
  const [isOpenAddPostDialog, setIsOpenDialogAddPost] = React.useState<boolean>(false);
  const [isOpenDeletePostDialog, setIsOpenDeletePostDialog] = React.useState<boolean>(false);
  const [currentPostSelected, setCurrentPostSelected] = React.useState<Post>({
    _id: '',
    title: '',
    description: '',
    url: '',
    status: '',
  });
  const [lastElement, setLastElement] = React.useState<HTMLDivElement | null>(null);
  const [currentStatusDialog, setCurrentStatusDialog] = React.useState<TYPE_STATUS>(
    TYPE_STATUS.ADD
  );

  const handleAddPost = (data: DataPostNew): void => {
    dispatch(addPostActions(data));
    setIsOpenDialogAddPost(false);
  };

  const handleEditPost = (data: DataPostNew): void => {
    const dataEdit: DataPostEdit = {
      _id: currentPostSelected._id,
      ...data,
    };
    dispatch(editPostActions(dataEdit));
    setIsOpenDialogAddPost(false);
  };

  const handleOpenAndCloseDeletePostDialog = (status: boolean): void => {
    setIsOpenDeletePostDialog(status);
  };

  const handleDeletePost = () => {
    dispatch(deletePostActions(currentPostSelected._id));
    handleOpenAndCloseDeletePostDialog(false);
  };

  const handleSelectedPost = (post: Post, type: TYPE_STATUS) => {
    setCurrentPostSelected(post);
    setCurrentStatusDialog(type);
    if (type === TYPE_STATUS.DELETE) {
      setIsOpenDeletePostDialog(true);
    } else if (type === TYPE_STATUS.EDIT) {
      setIsOpenDialogAddPost(true);
      setCurrentPostSelected({ ...post });
      setValue('url', post.url);
      setValue('description', post.description);
      setValue('status', post.status);
      setValue('title', post.title);
    }
  };

  const handleFetchListPost = (pagination: Pagination): void => {
    dispatch(getListPostActions(pagination));
  };

  React.useEffect(() => {
    handleFetchListPost({
      page: paginationPost.page,
      limit: paginationPost.limit,
    });
  }, []);

  React.useEffect(() => {}, [lastElement]);

  const findBackground = (string: string): string => {
    switch (string) {
      case StatusLearning.toLearn:
        return '#F8CC68';
      case StatusLearning.learning:
        return '#F6959D';
      case StatusLearning.learned:
        return '#7BC2B1';
      default:
        return '';
    }
  };

  const paginationRef = useRef<Pagination>();

  const observer = React.useMemo(() => {
    return new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        const currentPage = paginationRef?.current?.page;
        const totalPage = paginationRef.current?.totalPage;
        if (currentPage && totalPage && currentPage + 1 <= totalPage) {
          dispatch(
            setPagination({
              ...paginationPost,
              page: currentPage + 1,
            })
          );
          handleFetchListPost({
            ...paginationPost,
            page: currentPage + 1,
          });
        }
      }
    });
  }, []);

  const handleSetLastElement = (element: HTMLDivElement | null): void => {
    setLastElement(element);
  };

  React.useEffect(() => {
    if (lastElement) {
      observer.observe(lastElement as Element);
    }
    return () => {
      observer.disconnect();
    };
  }, [lastElement]);

  React.useEffect(() => {
    paginationRef.current = paginationPost;
  }, [paginationPost]);

  return {
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
  };
};
