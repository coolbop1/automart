--
-- PostgreSQL database dump
--

-- Dumped from database version 11.2 (Ubuntu 11.2-1.pgdg16.04+1)
-- Dumped by pg_dump version 11.3

-- Started on 2019-06-20 23:43:31 WAT

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

ALTER TABLE IF EXISTS ONLY public.reports DROP CONSTRAINT IF EXISTS reports_pkey;
ALTER TABLE IF EXISTS ONLY public.postads DROP CONSTRAINT IF EXISTS postads_pkey;
ALTER TABLE IF EXISTS ONLY public.orders DROP CONSTRAINT IF EXISTS orders_pkey;
ALTER TABLE IF EXISTS ONLY public.allusers DROP CONSTRAINT IF EXISTS allusers_pkey;
ALTER TABLE IF EXISTS public.reports ALTER COLUMN id DROP DEFAULT;
ALTER TABLE IF EXISTS public.postads ALTER COLUMN id DROP DEFAULT;
ALTER TABLE IF EXISTS public.orders ALTER COLUMN id DROP DEFAULT;
ALTER TABLE IF EXISTS public.allusers ALTER COLUMN id DROP DEFAULT;
DROP SEQUENCE IF EXISTS public.reports_id_seq;
DROP TABLE IF EXISTS public.reports;
DROP SEQUENCE IF EXISTS public.postads_id_seq;
DROP TABLE IF EXISTS public.postads;
DROP SEQUENCE IF EXISTS public.orders_id_seq;
DROP TABLE IF EXISTS public.orders;
DROP SEQUENCE IF EXISTS public.allusers_id_seq;
DROP TABLE IF EXISTS public.allusers;
SET default_tablespace = '';

SET default_with_oids = false;

--
-- TOC entry 197 (class 1259 OID 14007250)
-- Name: allusers; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.allusers (
    id integer NOT NULL,
    email character varying(500),
    first_name character varying(500),
    last_name character varying(500),
    password character varying(500),
    address character varying(500),
    is_admin character varying(500)
);


--
-- TOC entry 196 (class 1259 OID 14007248)
-- Name: allusers_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.allusers_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- TOC entry 3861 (class 0 OID 0)
-- Dependencies: 196
-- Name: allusers_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.allusers_id_seq OWNED BY public.allusers.id;


--
-- TOC entry 201 (class 1259 OID 14771872)
-- Name: orders; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.orders (
    id integer NOT NULL,
    buyer character varying(255),
    car_id integer,
    amount double precision,
    price_offered double precision,
    status character varying(255),
    created_on date
);


--
-- TOC entry 200 (class 1259 OID 14771870)
-- Name: orders_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.orders_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- TOC entry 3862 (class 0 OID 0)
-- Dependencies: 200
-- Name: orders_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.orders_id_seq OWNED BY public.orders.id;


--
-- TOC entry 199 (class 1259 OID 14148113)
-- Name: postads; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.postads (
    id integer NOT NULL,
    email character varying(255),
    owner integer,
    created_on date,
    manufacturer character varying(255),
    model character varying(255),
    price double precision,
    state character varying(255),
    engine_size character varying(255),
    body_type character varying(255),
    pics character varying(255),
    status character varying(255)
);


--
-- TOC entry 198 (class 1259 OID 14148111)
-- Name: postads_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.postads_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- TOC entry 3863 (class 0 OID 0)
-- Dependencies: 198
-- Name: postads_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.postads_id_seq OWNED BY public.postads.id;


--
-- TOC entry 203 (class 1259 OID 14951753)
-- Name: reports; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.reports (
    id integer NOT NULL,
    car_id integer,
    created_on date,
    reason character varying(1000),
    description character varying(255),
    reporter character varying(255)
);


--
-- TOC entry 202 (class 1259 OID 14951751)
-- Name: reports_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.reports_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- TOC entry 3864 (class 0 OID 0)
-- Dependencies: 202
-- Name: reports_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.reports_id_seq OWNED BY public.reports.id;


--
-- TOC entry 3723 (class 2604 OID 14007253)
-- Name: allusers id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.allusers ALTER COLUMN id SET DEFAULT nextval('public.allusers_id_seq'::regclass);


--
-- TOC entry 3725 (class 2604 OID 14771875)
-- Name: orders id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.orders ALTER COLUMN id SET DEFAULT nextval('public.orders_id_seq'::regclass);


--
-- TOC entry 3724 (class 2604 OID 14148116)
-- Name: postads id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.postads ALTER COLUMN id SET DEFAULT nextval('public.postads_id_seq'::regclass);


--
-- TOC entry 3726 (class 2604 OID 14951756)
-- Name: reports id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.reports ALTER COLUMN id SET DEFAULT nextval('public.reports_id_seq'::regclass);


--
-- TOC entry 3728 (class 2606 OID 14007258)
-- Name: allusers allusers_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.allusers
    ADD CONSTRAINT allusers_pkey PRIMARY KEY (id);


--
-- TOC entry 3732 (class 2606 OID 14771880)
-- Name: orders orders_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.orders
    ADD CONSTRAINT orders_pkey PRIMARY KEY (id);


--
-- TOC entry 3730 (class 2606 OID 14148121)
-- Name: postads postads_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.postads
    ADD CONSTRAINT postads_pkey PRIMARY KEY (id);


--
-- TOC entry 3734 (class 2606 OID 14951761)
-- Name: reports reports_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.reports
    ADD CONSTRAINT reports_pkey PRIMARY KEY (id);


-- Completed on 2019-06-20 23:44:32 WAT

--
-- PostgreSQL database dump complete
--

