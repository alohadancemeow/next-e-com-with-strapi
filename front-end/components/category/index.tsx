"use client";

import "./index.scss";
import useFetch from "@/hooks/use-fetch";
import Link from "next/link";
import { Suspense } from "react";

const Categories = () => {
  const { data, loading, error } = useFetch(`/categories`);

  return (
    <div className="categories">
      <Suspense fallback={<div>Loading...</div>}>
        <div className="col">
          <div className="row">
            <img
              src={`${data[0]?.attributes?.cover_image?.url}`}
              alt={`${data[0]?.attributes?.title}`}
            />
            <button>
              <Link href={`/category/${data[0]?.id}`} className="link">
                {data[0]?.attributes?.title || "cat title"}
              </Link>
            </button>
          </div>
          <div className="row">
            <img
              src={`${data[1]?.attributes?.cover_image?.url}`}
              alt={`${data[1]?.attributes?.title}`}
            />
            <button>
              <Link href={`/category/${data[1]?.id}`} className="link">
                {data[1]?.attributes?.title || "cat title"}
              </Link>
            </button>
          </div>
        </div>
        <div className="col">
          <div className="row">
            <img
              src={`${data[2]?.attributes?.cover_image?.url}`}
              alt={`${data[2]?.attributes?.title}`}
            />
            <button>
              <Link href={`/category/${data[2]?.id}`} className="link">
                {data[2]?.attributes?.title || "cat title"}
              </Link>
            </button>
          </div>
        </div>
        <div className="col col-l">
          <div className="row">
            <div className="col">
              <div className="row">
                <img
                  src={`${data[3]?.attributes?.cover_image?.url}`}
                  alt={`${data[3]?.attributes?.title}`}
                />
                <button>
                  <Link href={`/category/${data[3]?.id}`} className="link">
                    {data[3]?.attributes?.title || "cat title"}
                  </Link>
                </button>
              </div>
            </div>
            <div className="col">
              <div className="row">
                <img
                  src={`${data[4]?.attributes?.cover_image?.url}`}
                  alt={`${data[4]?.attributes?.title}`}
                />
                <button>
                  <Link href={`/category/${data[4]?.id}`} className="link">
                    {data[4]?.attributes?.title || "cat title"}
                  </Link>
                </button>
              </div>
            </div>
          </div>
          <div className="row">
            <img
              src={`${data[5]?.attributes?.cover_image?.url}`}
              alt={`${data[5]?.attributes?.title}`}
            />
            <button>
              <Link href={`/category/${data[5]?.id}`} className="link">
                {data[5]?.attributes?.title || "cat title"}
              </Link>
            </button>
          </div>
        </div>
      </Suspense>
    </div>
  );
};

export default Categories;
