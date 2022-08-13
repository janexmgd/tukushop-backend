--
-- PostgreSQL database dump
--

-- Dumped from database version 14.4 (Ubuntu 14.4-0ubuntu0.22.04.1)
-- Dumped by pg_dump version 14.4 (Ubuntu 14.4-0ubuntu0.22.04.1)

-- Started on 2022-08-12 11:54:58 WIB

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

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 210 (class 1259 OID 16394)
-- Name: category; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.category (
    id character varying(255) NOT NULL,
    name character varying(255) NOT NULL
);


ALTER TABLE public.category OWNER TO postgres;

--
-- TOC entry 209 (class 1259 OID 16387)
-- Name: products; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.products (
    id character varying(255) NOT NULL,
    name character varying(255) NOT NULL,
    stock integer NOT NULL,
    price integer NOT NULL,
    category_id character varying(255) NOT NULL
);


ALTER TABLE public.products OWNER TO postgres;

--
-- TOC entry 211 (class 1259 OID 16408)
-- Name: transaction; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.transaction (
    id character varying(255) NOT NULL,
    product_id character varying(255) NOT NULL,
    product_amount integer NOT NULL,
    total_payment integer NOT NULL,
    created_at timestamp without time zone NOT NULL
);


ALTER TABLE public.transaction OWNER TO postgres;

--
-- TOC entry 3360 (class 0 OID 16394)
-- Dependencies: 210
-- Data for Name: category; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.category (id, name) FROM stdin;
606b5ecc-ec12-4b69-b373-56a24100882e	poster
6c66ddef-a8f9-4562-aa4f-558985f57269	figuran
d589a7d5-a853-42e8-981c-e79374b7b458	kaos
0ae8f13c-c9e9-4aff-a515-4ae62684a8f2	topi
a05007de-ff46-4e00-8957-b8a8c0273a3f	kacamata
\.


--
-- TOC entry 3359 (class 0 OID 16387)
-- Dependencies: 209
-- Data for Name: products; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.products (id, name, stock, price, category_id) FROM stdin;
\.


--
-- TOC entry 3361 (class 0 OID 16408)
-- Dependencies: 211
-- Data for Name: transaction; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.transaction (id, product_id, product_amount, total_payment, created_at) FROM stdin;
\.


--
-- TOC entry 3217 (class 2606 OID 16400)
-- Name: category category_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.category
    ADD CONSTRAINT category_pkey PRIMARY KEY (id);


--
-- TOC entry 3215 (class 2606 OID 16393)
-- Name: products products_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.products
    ADD CONSTRAINT products_pkey PRIMARY KEY (id);


--
-- TOC entry 3219 (class 2606 OID 16414)
-- Name: transaction transaction_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.transaction
    ADD CONSTRAINT transaction_pkey PRIMARY KEY (id);


-- Completed on 2022-08-12 11:54:59 WIB

--
-- PostgreSQL database dump complete
--

