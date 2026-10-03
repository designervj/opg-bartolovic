"use client";

import React from "react";
import { ContactPage } from "@/components/ContactPage";

interface ContactViewProps {
  pageData?: any;
  onShowToast?: (message: string) => void;
}

export function ContactView({ pageData, onShowToast = () => {} }: ContactViewProps) {
  return <ContactPage onShowToast={onShowToast} />;
}

export default ContactView;
