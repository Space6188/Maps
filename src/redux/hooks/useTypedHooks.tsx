import React from 'react';
import {TypedUseSelectorHook, useDispatch, useSelector} from 'react-redux';
import {RootState, TypedDispatch} from '../store/store';

export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useTypedDispatch: () => TypedDispatch = useDispatch;
