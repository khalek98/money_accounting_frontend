import React from "react";
import { UseFormRegisterReturn } from "react-hook-form";

export interface IPropsForm extends React.FormHTMLAttributes<HTMLFormElement> {
  className?: string;
  children: React.ReactNode;
}

export interface IPropsInput extends React.InputHTMLAttributes<HTMLInputElement> {
  className?: string;
  register?: UseFormRegisterReturn;
}

export interface IPropsLabel extends React.LabelHTMLAttributes<HTMLLabelElement> {
  className?: string;
  children: React.ReactNode;
}

export interface IPropsInputContainer extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
  children: React.ReactNode;
}

export interface IPropsError extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
  children: React.ReactNode;
}
