"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Breadcrumb,
  BreadcrumbEllipsis,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator
} from "@/components/ui/breadcrumb";

function toTitle(text: string) {
  try {
    const decoded = decodeURIComponent(text);
    if (!decoded) return "";
    // Replace dashes with spaces and capitalize first letter
    return decoded
      .split("-")
      .map((s) => s.charAt(0).toUpperCase() + s.slice(1))
      .join(" ");
  } catch {
    return text;
  }
}

export default function Breadcrumbs() {
  const pathname = usePathname();

  // Hide on root
  if (!pathname || pathname === "/") return null;

  const segments = pathname.split("/").filter(Boolean);

  // Build hrefs for each segment
  const items = segments.map((seg, idx) => {
    const href = "/" + segments.slice(0, idx + 1).join("/");
    return { label: toTitle(seg), href };
  });

  // If too many segments, collapse the middle with ellipsis
  const shouldCollapse = items.length > 4;
  const displayItems = shouldCollapse
    ? [items[0], { label: "…", href: items[Math.max(1, items.length - 3)].href }, ...items.slice(-2)]
    : items;

  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink asChild>
            <Link href="/">홈</Link>
          </BreadcrumbLink>
        </BreadcrumbItem>
        {items.length > 0 && <BreadcrumbSeparator />}

        {displayItems.map((item, i) => {
          const isLast = i === displayItems.length - 1;

          // Ellipsis placeholder (not clickable)
          if (item.label === "…") {
            return (
              <React.Fragment key={`ellipsis-${i}`}>
                <BreadcrumbItem>
                  <BreadcrumbEllipsis />
                </BreadcrumbItem>
                <BreadcrumbSeparator />
              </React.Fragment>
            );
          }

          return (
            <React.Fragment key={item.href}>
              <BreadcrumbItem>
                {isLast ? (
                  <BreadcrumbPage>{item.label}</BreadcrumbPage>
                ) : (
                  <BreadcrumbLink asChild>
                    <Link href={item.href}>{item.label}</Link>
                  </BreadcrumbLink>
                )}
              </BreadcrumbItem>
              {!isLast && <BreadcrumbSeparator />}
            </React.Fragment>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
