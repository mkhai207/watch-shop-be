--
-- PostgreSQL database dump
--

-- Dumped from database version 16.8
-- Dumped by pg_dump version 16.8

-- Started on 2025-10-12 16:30:14

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
-- TOC entry 220 (class 1259 OID 26858)
-- Name: addresses; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.addresses (
    id bigint NOT NULL,
    city character varying(255),
    district character varying(255),
    is_default character varying(1) DEFAULT '0'::character varying NOT NULL,
    phone_number character varying(15),
    recipient_name character varying(255),
    street character varying(255) NOT NULL,
    ward character varying(255) NOT NULL,
    created_at character varying(14) NOT NULL,
    created_by bigint,
    updated_at character varying(14),
    updated_by bigint,
    del_flag character varying(1) DEFAULT '0'::character varying NOT NULL,
    user_id bigint NOT NULL
);


ALTER TABLE public.addresses OWNER TO postgres;

--
-- TOC entry 219 (class 1259 OID 26857)
-- Name: addresses_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.addresses_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.addresses_id_seq OWNER TO postgres;

--
-- TOC entry 5073 (class 0 OID 0)
-- Dependencies: 219
-- Name: addresses_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.addresses_id_seq OWNED BY public.addresses.id;


--
-- TOC entry 222 (class 1259 OID 26874)
-- Name: brands; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.brands (
    id bigint NOT NULL,
    name character varying(255) NOT NULL,
    logo_url character varying(255),
    description character varying(255),
    created_at character varying(14) NOT NULL,
    created_by bigint,
    updated_at character varying(14),
    updated_by bigint,
    del_flag character varying(1) DEFAULT '0'::character varying NOT NULL
);


ALTER TABLE public.brands OWNER TO postgres;

--
-- TOC entry 221 (class 1259 OID 26873)
-- Name: brands_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.brands_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.brands_id_seq OWNER TO postgres;

--
-- TOC entry 5074 (class 0 OID 0)
-- Dependencies: 221
-- Name: brands_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.brands_id_seq OWNED BY public.brands.id;


--
-- TOC entry 238 (class 1259 OID 26984)
-- Name: cart_items; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.cart_items (
    id bigint NOT NULL,
    cart_id bigint NOT NULL,
    variant_id bigint,
    quantity integer NOT NULL,
    unit_price double precision NOT NULL,
    total_price double precision NOT NULL,
    created_at character varying(14) NOT NULL,
    created_by bigint,
    updated_at character varying(14),
    updated_by bigint,
    del_flag character varying(1) DEFAULT '0'::character varying NOT NULL
);


ALTER TABLE public.cart_items OWNER TO postgres;

--
-- TOC entry 237 (class 1259 OID 26983)
-- Name: cart_items_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.cart_items_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.cart_items_id_seq OWNER TO postgres;

--
-- TOC entry 5075 (class 0 OID 0)
-- Dependencies: 237
-- Name: cart_items_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.cart_items_id_seq OWNED BY public.cart_items.id;


--
-- TOC entry 224 (class 1259 OID 26884)
-- Name: carts; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.carts (
    id bigint NOT NULL,
    user_id bigint,
    session_id character varying(100),
    status character varying(20) DEFAULT 'active'::character varying,
    created_at character varying(14),
    created_by bigint,
    updated_at character varying(14),
    updated_by bigint,
    del_flag character varying(1) DEFAULT '0'::character varying,
    total_money double precision
);


ALTER TABLE public.carts OWNER TO postgres;

--
-- TOC entry 223 (class 1259 OID 26883)
-- Name: carts_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.carts_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.carts_id_seq OWNER TO postgres;

--
-- TOC entry 5076 (class 0 OID 0)
-- Dependencies: 223
-- Name: carts_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.carts_id_seq OWNED BY public.carts.id;


--
-- TOC entry 226 (class 1259 OID 26898)
-- Name: categorys; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.categorys (
    id bigint NOT NULL,
    name character varying(255) NOT NULL,
    image_url character varying(255),
    description character varying(255),
    created_at character varying(14) NOT NULL,
    created_by bigint,
    updated_at character varying(14),
    updated_by bigint,
    del_flag character varying(1) DEFAULT '0'::character varying NOT NULL
);


ALTER TABLE public.categorys OWNER TO postgres;

--
-- TOC entry 225 (class 1259 OID 26897)
-- Name: categorys_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.categorys_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.categorys_id_seq OWNER TO postgres;

--
-- TOC entry 5077 (class 0 OID 0)
-- Dependencies: 225
-- Name: categorys_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.categorys_id_seq OWNED BY public.categorys.id;


--
-- TOC entry 232 (class 1259 OID 26945)
-- Name: colors; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.colors (
    id bigint NOT NULL,
    name character varying(50) NOT NULL,
    hex_code character varying(7) NOT NULL,
    created_at character varying(14) NOT NULL,
    created_by bigint,
    updated_at character varying(14),
    updated_by bigint,
    del_flag character varying(1) DEFAULT '0'::character varying NOT NULL
);


ALTER TABLE public.colors OWNER TO postgres;

--
-- TOC entry 231 (class 1259 OID 26944)
-- Name: colors_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.colors_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.colors_id_seq OWNER TO postgres;

--
-- TOC entry 5078 (class 0 OID 0)
-- Dependencies: 231
-- Name: colors_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.colors_id_seq OWNED BY public.colors.id;


--
-- TOC entry 240 (class 1259 OID 27002)
-- Name: config_order_status; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.config_order_status (
    id bigint NOT NULL,
    code character varying(20),
    name character varying(255),
    description character varying(255),
    hex_code character varying(7),
    color character varying(20),
    sort_order integer,
    created_at character varying(14),
    created_by bigint,
    updated_at character varying(14),
    updated_by bigint,
    del_flag character varying(1) DEFAULT '0'::character varying
);


ALTER TABLE public.config_order_status OWNER TO postgres;

--
-- TOC entry 239 (class 1259 OID 27001)
-- Name: config_order_status_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.config_order_status_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.config_order_status_id_seq OWNER TO postgres;

--
-- TOC entry 5079 (class 0 OID 0)
-- Dependencies: 239
-- Name: config_order_status_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.config_order_status_id_seq OWNED BY public.config_order_status.id;


--
-- TOC entry 242 (class 1259 OID 27012)
-- Name: discounts; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.discounts (
    id bigint NOT NULL,
    code character varying(20) NOT NULL,
    name character varying(100) NOT NULL,
    description character varying(255),
    min_order_value double precision,
    max_discount_amount double precision,
    discount_type character varying(1),
    discount_value double precision,
    effective_date character varying(14),
    valid_until character varying(14),
    created_at character varying(14),
    created_by bigint,
    updated_at character varying(14),
    updated_by bigint,
    del_flag character varying(1) DEFAULT '0'::character varying
);


ALTER TABLE public.discounts OWNER TO postgres;

--
-- TOC entry 241 (class 1259 OID 27011)
-- Name: discounts_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.discounts_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.discounts_id_seq OWNER TO postgres;

--
-- TOC entry 5080 (class 0 OID 0)
-- Dependencies: 241
-- Name: discounts_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.discounts_id_seq OWNED BY public.discounts.id;


--
-- TOC entry 228 (class 1259 OID 26908)
-- Name: movement_types; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.movement_types (
    id bigint NOT NULL,
    code character varying(10),
    name character varying(255) NOT NULL,
    description character varying(255),
    created_at character varying(14) NOT NULL,
    created_by bigint,
    updated_at character varying(14),
    updated_by bigint,
    del_flag character varying(1) DEFAULT '0'::character varying NOT NULL
);


ALTER TABLE public.movement_types OWNER TO postgres;

--
-- TOC entry 227 (class 1259 OID 26907)
-- Name: movement_types_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.movement_types_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.movement_types_id_seq OWNER TO postgres;

--
-- TOC entry 5081 (class 0 OID 0)
-- Dependencies: 227
-- Name: movement_types_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.movement_types_id_seq OWNED BY public.movement_types.id;


--
-- TOC entry 246 (class 1259 OID 27041)
-- Name: order_details; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.order_details (
    id bigint NOT NULL,
    order_id bigint NOT NULL,
    variant_id bigint NOT NULL,
    quantity integer,
    unit_price double precision,
    total_price double precision,
    created_at character varying(14),
    created_by bigint,
    updated_at character varying(14),
    updated_by bigint,
    del_flag character varying(1) DEFAULT '0'::character varying,
    watch_id bigint
);


ALTER TABLE public.order_details OWNER TO postgres;

--
-- TOC entry 245 (class 1259 OID 27040)
-- Name: order_details_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.order_details_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.order_details_id_seq OWNER TO postgres;

--
-- TOC entry 5082 (class 0 OID 0)
-- Dependencies: 245
-- Name: order_details_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.order_details_id_seq OWNED BY public.order_details.id;


--
-- TOC entry 248 (class 1259 OID 27064)
-- Name: order_status_history; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.order_status_history (
    id bigint NOT NULL,
    order_id bigint,
    status_id bigint,
    note character varying(255),
    created_at character varying(14),
    created_by bigint,
    updated_at character varying(14),
    updated_by bigint,
    del_flag character varying(1) DEFAULT '0'::character varying
);


ALTER TABLE public.order_status_history OWNER TO postgres;

--
-- TOC entry 247 (class 1259 OID 27063)
-- Name: order_status_history_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.order_status_history_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.order_status_history_id_seq OWNER TO postgres;

--
-- TOC entry 5083 (class 0 OID 0)
-- Dependencies: 247
-- Name: order_status_history_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.order_status_history_id_seq OWNED BY public.order_status_history.id;


--
-- TOC entry 244 (class 1259 OID 27020)
-- Name: orders; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.orders (
    id bigint NOT NULL,
    user_id bigint,
    total_amount double precision,
    discount_code character varying(20),
    discount_amount double precision,
    final_amount double precision,
    shipping_address text,
    shipping_fee double precision,
    note character varying(255),
    guess_name character varying(50),
    guess_email character varying(100),
    guess_phone character varying(15),
    created_at character varying(14),
    created_by bigint,
    updated_at character varying(14),
    updated_by bigint,
    del_flag character varying(1) DEFAULT '0'::character varying,
    current_status_id bigint,
    code character varying(50),
    review_flag character varying(1) DEFAULT '0'::character varying,
    payment_method character varying(1)
);


ALTER TABLE public.orders OWNER TO postgres;

--
-- TOC entry 243 (class 1259 OID 27019)
-- Name: orders_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.orders_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.orders_id_seq OWNER TO postgres;

--
-- TOC entry 5084 (class 0 OID 0)
-- Dependencies: 243
-- Name: orders_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.orders_id_seq OWNED BY public.orders.id;


--
-- TOC entry 250 (class 1259 OID 27082)
-- Name: payments; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.payments (
    id bigint NOT NULL,
    order_id bigint NOT NULL,
    transaction_code character varying(50),
    amount double precision,
    method character varying(50),
    status character varying(50),
    type character varying(1) DEFAULT '0'::character varying,
    note character varying(255),
    created_at character varying(14),
    created_by bigint,
    updated_at character varying(14),
    updated_by bigint,
    del_flag character varying(1) DEFAULT '0'::character varying,
    gateway_trans_no character varying(50),
    trans_date character varying(50)
);


ALTER TABLE public.payments OWNER TO postgres;

--
-- TOC entry 249 (class 1259 OID 27081)
-- Name: payments_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.payments_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.payments_id_seq OWNER TO postgres;

--
-- TOC entry 5085 (class 0 OID 0)
-- Dependencies: 249
-- Name: payments_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.payments_id_seq OWNED BY public.payments.id;


--
-- TOC entry 254 (class 1259 OID 27106)
-- Name: permission_role; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.permission_role (
    id bigint NOT NULL,
    role_id bigint NOT NULL,
    permission_id bigint NOT NULL,
    created_at character varying(14) NOT NULL,
    created_by bigint,
    updated_at character varying(14),
    updated_by bigint,
    del_flag character varying(1) DEFAULT '0'::character varying NOT NULL
);


ALTER TABLE public.permission_role OWNER TO postgres;

--
-- TOC entry 253 (class 1259 OID 27105)
-- Name: permission_role_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.permission_role_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.permission_role_id_seq OWNER TO postgres;

--
-- TOC entry 5086 (class 0 OID 0)
-- Dependencies: 253
-- Name: permission_role_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.permission_role_id_seq OWNED BY public.permission_role.id;


--
-- TOC entry 252 (class 1259 OID 27096)
-- Name: permissions; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.permissions (
    id bigint NOT NULL,
    api_path character varying(255) NOT NULL,
    method character varying(255) NOT NULL,
    module character varying(255),
    name character varying(255),
    created_at character varying(14) NOT NULL,
    created_by bigint,
    updated_at character varying(14),
    updated_by bigint,
    del_flag character varying(1) DEFAULT '0'::character varying NOT NULL
);


ALTER TABLE public.permissions OWNER TO postgres;

--
-- TOC entry 251 (class 1259 OID 27095)
-- Name: permissions_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.permissions_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.permissions_id_seq OWNER TO postgres;

--
-- TOC entry 5087 (class 0 OID 0)
-- Dependencies: 251
-- Name: permissions_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.permissions_id_seq OWNED BY public.permissions.id;


--
-- TOC entry 256 (class 1259 OID 27124)
-- Name: reviews; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.reviews (
    id bigint NOT NULL,
    rating double precision NOT NULL,
    comment character varying(255),
    image_url text,
    user_id bigint NOT NULL,
    order_id bigint NOT NULL,
    watch_id bigint NOT NULL,
    created_at character varying(14) NOT NULL,
    created_by bigint,
    updated_at character varying(14),
    updated_by bigint,
    del_flag character varying(1) DEFAULT '0'::character varying NOT NULL
);


ALTER TABLE public.reviews OWNER TO postgres;

--
-- TOC entry 255 (class 1259 OID 27123)
-- Name: reviews_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.reviews_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.reviews_id_seq OWNER TO postgres;

--
-- TOC entry 5088 (class 0 OID 0)
-- Dependencies: 255
-- Name: reviews_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.reviews_id_seq OWNED BY public.reviews.id;


--
-- TOC entry 216 (class 1259 OID 26834)
-- Name: roles; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.roles (
    id bigint NOT NULL,
    code character varying(50),
    name character varying(50) NOT NULL,
    description character varying(255),
    created_at character varying(14) NOT NULL,
    created_by bigint,
    updated_at character varying(14),
    updated_by bigint,
    del_flag character varying(1) DEFAULT '0'::character varying NOT NULL
);


ALTER TABLE public.roles OWNER TO postgres;

--
-- TOC entry 215 (class 1259 OID 26833)
-- Name: roles_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.roles_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.roles_id_seq OWNER TO postgres;

--
-- TOC entry 5089 (class 0 OID 0)
-- Dependencies: 215
-- Name: roles_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.roles_id_seq OWNED BY public.roles.id;


--
-- TOC entry 258 (class 1259 OID 27149)
-- Name: shipments; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.shipments (
    id bigint NOT NULL,
    order_id bigint,
    carrier character varying(100),
    tracking_code character varying(50),
    estimated_delivery character varying(14),
    delivered_at character varying(14),
    created_at character varying(14) NOT NULL,
    created_by bigint,
    updated_at character varying(14),
    updated_by bigint,
    del_flag character varying(1) DEFAULT '0'::character varying
);


ALTER TABLE public.shipments OWNER TO postgres;

--
-- TOC entry 257 (class 1259 OID 27148)
-- Name: shipments_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.shipments_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.shipments_id_seq OWNER TO postgres;

--
-- TOC entry 5090 (class 0 OID 0)
-- Dependencies: 257
-- Name: shipments_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.shipments_id_seq OWNED BY public.shipments.id;


--
-- TOC entry 234 (class 1259 OID 26953)
-- Name: strap_materials; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.strap_materials (
    id bigint NOT NULL,
    code character varying(10),
    name character varying(50) NOT NULL,
    description character varying(255),
    extra_money double precision,
    created_at character varying(14) NOT NULL,
    created_by bigint,
    updated_at character varying(14),
    updated_by bigint,
    del_flag character varying(1) DEFAULT '0'::character varying NOT NULL
);


ALTER TABLE public.strap_materials OWNER TO postgres;

--
-- TOC entry 233 (class 1259 OID 26952)
-- Name: strap_materials_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.strap_materials_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.strap_materials_id_seq OWNER TO postgres;

--
-- TOC entry 5091 (class 0 OID 0)
-- Dependencies: 233
-- Name: strap_materials_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.strap_materials_id_seq OWNED BY public.strap_materials.id;


--
-- TOC entry 260 (class 1259 OID 27162)
-- Name: tb_dictionarys; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.tb_dictionarys (
    id bigint NOT NULL,
    col_nm character varying(255) NOT NULL,
    col_val character varying(255) NOT NULL,
    content character varying(255),
    lang character varying(2),
    note character varying(255)
);


ALTER TABLE public.tb_dictionarys OWNER TO postgres;

--
-- TOC entry 259 (class 1259 OID 27161)
-- Name: tb_dictionarys_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.tb_dictionarys_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.tb_dictionarys_id_seq OWNER TO postgres;

--
-- TOC entry 5092 (class 0 OID 0)
-- Dependencies: 259
-- Name: tb_dictionarys_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.tb_dictionarys_id_seq OWNED BY public.tb_dictionarys.id;


--
-- TOC entry 262 (class 1259 OID 27172)
-- Name: tokens; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.tokens (
    id bigint NOT NULL,
    owner_type character varying(50),
    user_id bigint NOT NULL,
    token_type character varying(1) NOT NULL,
    token_value character varying(512) NOT NULL,
    device_info character varying(255),
    ip_address character varying(45),
    is_active character varying(1) DEFAULT '1'::character varying NOT NULL,
    expires_at character varying(14) NOT NULL,
    revoked_at character varying(14),
    created_at character varying(14) NOT NULL,
    created_by bigint,
    updated_at timestamp with time zone,
    updated_by bigint
);


ALTER TABLE public.tokens OWNER TO postgres;

--
-- TOC entry 261 (class 1259 OID 27171)
-- Name: tokens_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.tokens_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.tokens_id_seq OWNER TO postgres;

--
-- TOC entry 5093 (class 0 OID 0)
-- Dependencies: 261
-- Name: tokens_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.tokens_id_seq OWNED BY public.tokens.id;


--
-- TOC entry 218 (class 1259 OID 26842)
-- Name: users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users (
    id bigint NOT NULL,
    code character varying(20),
    username character varying(50) NOT NULL,
    password character varying(255) NOT NULL,
    email character varying(255),
    phone_number character varying(15),
    first_name character varying(100),
    last_name character varying(100),
    gender character varying(1),
    date_of_birth character varying(8),
    address text,
    status character varying(1) DEFAULT '0'::character varying NOT NULL,
    created_at character varying(14) NOT NULL,
    created_by integer,
    updated_at character varying(14),
    updated_by integer,
    del_flag character varying(1) DEFAULT '0'::character varying NOT NULL,
    role_id integer NOT NULL
);


ALTER TABLE public.users OWNER TO postgres;

--
-- TOC entry 217 (class 1259 OID 26841)
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.users_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.users_id_seq OWNER TO postgres;

--
-- TOC entry 5094 (class 0 OID 0)
-- Dependencies: 217
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- TOC entry 236 (class 1259 OID 26961)
-- Name: watch_variants; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.watch_variants (
    id bigint NOT NULL,
    watch_id bigint,
    color_id bigint,
    strap_material_id bigint,
    stock_quantity integer,
    price double precision,
    created_at character varying(14),
    created_by bigint,
    updated_at character varying(14),
    updated_by bigint,
    del_flag character varying(1) DEFAULT '0'::character varying
);


ALTER TABLE public.watch_variants OWNER TO postgres;

--
-- TOC entry 235 (class 1259 OID 26960)
-- Name: watch_variants_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.watch_variants_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.watch_variants_id_seq OWNER TO postgres;

--
-- TOC entry 5095 (class 0 OID 0)
-- Dependencies: 235
-- Name: watch_variants_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.watch_variants_id_seq OWNED BY public.watch_variants.id;


--
-- TOC entry 230 (class 1259 OID 26918)
-- Name: watches; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.watches (
    id bigint NOT NULL,
    code character varying(50),
    name character varying(255),
    description text,
    model character varying(50),
    case_material character varying(50),
    case_size double precision,
    strap_size double precision,
    gender character varying(1),
    water_resistance character varying(255),
    release_date character varying(14),
    sold integer DEFAULT 0,
    base_price double precision,
    rating double precision,
    status boolean DEFAULT true,
    thumbnail character varying(255),
    slider text,
    created_at character varying(14),
    updated_at character varying(14),
    updated_by bigint,
    del_flag character varying(1) DEFAULT '0'::character varying,
    category_id bigint NOT NULL,
    brand_id bigint NOT NULL,
    movement_type_id bigint NOT NULL,
    created_by bigint
);


ALTER TABLE public.watches OWNER TO postgres;

--
-- TOC entry 229 (class 1259 OID 26917)
-- Name: watches_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.watches_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.watches_id_seq OWNER TO postgres;

--
-- TOC entry 5096 (class 0 OID 0)
-- Dependencies: 229
-- Name: watches_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.watches_id_seq OWNED BY public.watches.id;


--
-- TOC entry 4754 (class 2604 OID 26861)
-- Name: addresses id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.addresses ALTER COLUMN id SET DEFAULT nextval('public.addresses_id_seq'::regclass);


--
-- TOC entry 4757 (class 2604 OID 26877)
-- Name: brands id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.brands ALTER COLUMN id SET DEFAULT nextval('public.brands_id_seq'::regclass);


--
-- TOC entry 4776 (class 2604 OID 26987)
-- Name: cart_items id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.cart_items ALTER COLUMN id SET DEFAULT nextval('public.cart_items_id_seq'::regclass);


--
-- TOC entry 4759 (class 2604 OID 26887)
-- Name: carts id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.carts ALTER COLUMN id SET DEFAULT nextval('public.carts_id_seq'::regclass);


--
-- TOC entry 4762 (class 2604 OID 26901)
-- Name: categorys id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.categorys ALTER COLUMN id SET DEFAULT nextval('public.categorys_id_seq'::regclass);


--
-- TOC entry 4770 (class 2604 OID 26948)
-- Name: colors id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.colors ALTER COLUMN id SET DEFAULT nextval('public.colors_id_seq'::regclass);


--
-- TOC entry 4778 (class 2604 OID 27005)
-- Name: config_order_status id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.config_order_status ALTER COLUMN id SET DEFAULT nextval('public.config_order_status_id_seq'::regclass);


--
-- TOC entry 4780 (class 2604 OID 27015)
-- Name: discounts id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.discounts ALTER COLUMN id SET DEFAULT nextval('public.discounts_id_seq'::regclass);


--
-- TOC entry 4764 (class 2604 OID 26911)
-- Name: movement_types id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.movement_types ALTER COLUMN id SET DEFAULT nextval('public.movement_types_id_seq'::regclass);


--
-- TOC entry 4785 (class 2604 OID 27044)
-- Name: order_details id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.order_details ALTER COLUMN id SET DEFAULT nextval('public.order_details_id_seq'::regclass);


--
-- TOC entry 4787 (class 2604 OID 27067)
-- Name: order_status_history id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.order_status_history ALTER COLUMN id SET DEFAULT nextval('public.order_status_history_id_seq'::regclass);


--
-- TOC entry 4782 (class 2604 OID 27023)
-- Name: orders id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.orders ALTER COLUMN id SET DEFAULT nextval('public.orders_id_seq'::regclass);


--
-- TOC entry 4789 (class 2604 OID 27085)
-- Name: payments id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.payments ALTER COLUMN id SET DEFAULT nextval('public.payments_id_seq'::regclass);


--
-- TOC entry 4794 (class 2604 OID 27109)
-- Name: permission_role id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.permission_role ALTER COLUMN id SET DEFAULT nextval('public.permission_role_id_seq'::regclass);


--
-- TOC entry 4792 (class 2604 OID 27099)
-- Name: permissions id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.permissions ALTER COLUMN id SET DEFAULT nextval('public.permissions_id_seq'::regclass);


--
-- TOC entry 4796 (class 2604 OID 27127)
-- Name: reviews id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.reviews ALTER COLUMN id SET DEFAULT nextval('public.reviews_id_seq'::regclass);


--
-- TOC entry 4749 (class 2604 OID 26837)
-- Name: roles id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.roles ALTER COLUMN id SET DEFAULT nextval('public.roles_id_seq'::regclass);


--
-- TOC entry 4798 (class 2604 OID 27152)
-- Name: shipments id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.shipments ALTER COLUMN id SET DEFAULT nextval('public.shipments_id_seq'::regclass);


--
-- TOC entry 4772 (class 2604 OID 26956)
-- Name: strap_materials id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.strap_materials ALTER COLUMN id SET DEFAULT nextval('public.strap_materials_id_seq'::regclass);


--
-- TOC entry 4800 (class 2604 OID 27165)
-- Name: tb_dictionarys id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tb_dictionarys ALTER COLUMN id SET DEFAULT nextval('public.tb_dictionarys_id_seq'::regclass);


--
-- TOC entry 4801 (class 2604 OID 27175)
-- Name: tokens id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tokens ALTER COLUMN id SET DEFAULT nextval('public.tokens_id_seq'::regclass);


--
-- TOC entry 4751 (class 2604 OID 26845)
-- Name: users id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- TOC entry 4774 (class 2604 OID 26964)
-- Name: watch_variants id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.watch_variants ALTER COLUMN id SET DEFAULT nextval('public.watch_variants_id_seq'::regclass);


--
-- TOC entry 4766 (class 2604 OID 26921)
-- Name: watches id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.watches ALTER COLUMN id SET DEFAULT nextval('public.watches_id_seq'::regclass);


--
-- TOC entry 5025 (class 0 OID 26858)
-- Dependencies: 220
-- Data for Name: addresses; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.addresses (id, city, district, is_default, phone_number, recipient_name, street, ward, created_at, created_by, updated_at, updated_by, del_flag, user_id) FROM stdin;
2	Hà Nội	Quận Hoàng Kiếm	1	0123456789	Lê MInh Khải	Hoàng diệu 2	Phường Linh Trung	20250919214900	10	20250919215843	10	0	10
1	Hà Nội	Quận Hoàng Kiếm	0	0123456789	Lê MInh Khải	Hoàng diệu 2	Phường Linh Trung	20250919214827	10	20250919220149	10	1	10
3	Hà Nội	Quận Hoàng Kiếm	0	0123456789	Lê MInh Khải	Hoàng diệu 2	Phường Linh Trung	20251002224425	10	\N	\N	0	10
\.


--
-- TOC entry 5027 (class 0 OID 26874)
-- Dependencies: 222
-- Data for Name: brands; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.brands (id, name, logo_url, description, created_at, created_by, updated_at, updated_by, del_flag) FROM stdin;
1	Olympia12	Olympia.png		20250918131636	10	20250918135944	10	0
\.


--
-- TOC entry 5043 (class 0 OID 26984)
-- Dependencies: 238
-- Data for Name: cart_items; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.cart_items (id, cart_id, variant_id, quantity, unit_price, total_price, created_at, created_by, updated_at, updated_by, del_flag) FROM stdin;
12	15	29	1	18000000	18000000	20251008212311	10	\N	\N	0
\.


--
-- TOC entry 5029 (class 0 OID 26884)
-- Dependencies: 224
-- Data for Name: carts; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.carts (id, user_id, session_id, status, created_at, created_by, updated_at, updated_by, del_flag, total_money) FROM stdin;
15	10	c1ad51e8-89f6-4b94-99c5-b62a3dddeb79	active	20250927150108	\N	\N	10	0	129202199.89
\.


--
-- TOC entry 5031 (class 0 OID 26898)
-- Dependencies: 226
-- Data for Name: categorys; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.categorys (id, name, image_url, description, created_at, created_by, updated_at, updated_by, del_flag) FROM stdin;
1	Olympia12	Olympia.png		20250918190433	10	20250918200410	10	0
\.


--
-- TOC entry 5037 (class 0 OID 26945)
-- Dependencies: 232
-- Data for Name: colors; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.colors (id, name, hex_code, created_at, created_by, updated_at, updated_by, del_flag) FROM stdin;
1	Màu trắng	#FFFFFF	20250920171956	10	20250920172943	10	1
2	Màu đen	#000000	20250929225046	10	\N	\N	0
\.


--
-- TOC entry 5045 (class 0 OID 27002)
-- Dependencies: 240
-- Data for Name: config_order_status; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.config_order_status (id, code, name, description, hex_code, color, sort_order, created_at, created_by, updated_at, updated_by, del_flag) FROM stdin;
1	PENDING	Chờ xác nhận	Đơn hàng của bạn đang ở hàng đợi xác nhận	#FFC107	Màu vàng	1	20250928090333	10	20250928091040	10	0
2	PENDINGPAYMENT	Chờ thanh toán	Đơn hàng của bạn đang ở hàng đợi thanh toán. Vui lòng thanh toán	#FD7E14	Orange	2	20250928115729	10	\N	\N	0
3	PAID	Đã thanh toán	Đơn hàng của bạn đã được thanh toán thành công.	#00FF00	Green	3	20250928123754	10	\N	\N	0
4	PREPARING	Đang chuẩn bị hàng	Đơn hàng của bạn đang được chuẩn bị và đóng gói	#2196F3	Blue	4	20250928145840	10	\N	\N	0
5	CANCEL	Đơn hàng đã bị hủy	Đơn hàng của bạn đã hủy	#F44336	Red	5	20251004222540	10	20251004222643	10	0
6	COMPLETED	Đã hoàn thành	Đơn hàng của bạn đã được giao thành công	#008000	Green	6	20251005173526	10	\N	\N	0
\.


--
-- TOC entry 5047 (class 0 OID 27012)
-- Dependencies: 242
-- Data for Name: discounts; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.discounts (id, code, name, description, min_order_value, max_discount_amount, discount_type, discount_value, effective_date, valid_until, created_at, created_by, updated_at, updated_by, del_flag) FROM stdin;
1	GIAMGIA20K	Giám giá bạn mới 20k	Giảm giá 20k cho đơn hàng đầu tiên	100000	\N	1	20	20251005000000	20251010000000	20251005190627	10	20251005191201	10	0
\.


--
-- TOC entry 5033 (class 0 OID 26908)
-- Dependencies: 228
-- Data for Name: movement_types; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.movement_types (id, code, name, description, created_at, created_by, updated_at, updated_by, del_flag) FROM stdin;
1	CODE	Đồng hồ cơ	Đồng hồ cơ là đồng hồ không cần pin	20250919230241	10	\N	\N	0
2	PIN	Đồng hồ PIN	Đồng hồ cơ là đồng hồ không cần pin	20250919230252	10	20250919230756	10	0
\.


--
-- TOC entry 5051 (class 0 OID 27041)
-- Dependencies: 246
-- Data for Name: order_details; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.order_details (id, order_id, variant_id, quantity, unit_price, total_price, created_at, created_by, updated_at, updated_by, del_flag, watch_id) FROM stdin;
31	16	26	1	9200000	9200000	20251001212709	10	\N	\N	0	\N
32	16	25	1	9500000	9500000	20251001212709	10	\N	\N	0	\N
33	17	26	1	9200000	9200000	20251004205438	10	\N	\N	0	\N
34	17	25	1	9500000	9500000	20251004205438	10	\N	\N	0	\N
35	18	26	1	9200000	9200000	20251009181138	10	\N	\N	0	\N
36	18	25	1	9500000	9500000	20251009181138	10	\N	\N	0	\N
\.


--
-- TOC entry 5053 (class 0 OID 27064)
-- Dependencies: 248
-- Data for Name: order_status_history; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.order_status_history (id, order_id, status_id, note, created_at, created_by, updated_at, updated_by, del_flag) FROM stdin;
22	16	2	\N	20251001212709	10	\N	\N	0
23	17	2	\N	20251004205438	10	\N	\N	0
24	17	3		20251004205529	10	\N	\N	0
38	17	6		20251005180849	10	\N	\N	0
39	18	2	\N	20251009181138	10	\N	\N	0
\.


--
-- TOC entry 5049 (class 0 OID 27020)
-- Dependencies: 244
-- Data for Name: orders; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.orders (id, user_id, total_amount, discount_code, discount_amount, final_amount, shipping_address, shipping_fee, note, guess_name, guess_email, guess_phone, created_at, created_by, updated_at, updated_by, del_flag, current_status_id, code, review_flag, payment_method) FROM stdin;
16	10	18700000	\N	0	18750000	123 Đường ABC, Quận 1, TP.HCM	50000	\N	Nguyen Van A	lkhai4617@gmail.com	0912345678	20251001212709	10	\N	\N	0	2	ORD20251001212709-1838	0	1
17	10	18700000	\N	0	18750000	123 Đường ABC, Quận 1, TP.HCM	50000	\N	Nguyen Van A	lkhai4617@gmail.com	0912345678	20251004205438	10	20251008220059	10	0	6	ORD20251004205438-4248	1	1
18	10	18700000	\N	0	18750000	123 Đường ABC, Quận 1, TP.HCM	50000	\N	Nguyen Van A	lkhai4617@gmail.com	0912345678	20251009181138	10	\N	\N	0	2	ORD20251009181138-3100	0	1
\.


--
-- TOC entry 5055 (class 0 OID 27082)
-- Dependencies: 250
-- Data for Name: payments; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.payments (id, order_id, transaction_code, amount, method, status, type, note, created_at, created_by, updated_at, updated_by, del_flag, gateway_trans_no, trans_date) FROM stdin;
3	17	ORDER_17_1759586078914	18750000	vnpay	success	0	Thanh toan don hang 17	20251004205529	10	\N	\N	0	15191163	20251004205658
\.


--
-- TOC entry 5059 (class 0 OID 27106)
-- Dependencies: 254
-- Data for Name: permission_role; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.permission_role (id, role_id, permission_id, created_at, created_by, updated_at, updated_by, del_flag) FROM stdin;
\.


--
-- TOC entry 5057 (class 0 OID 27096)
-- Dependencies: 252
-- Data for Name: permissions; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.permissions (id, api_path, method, module, name, created_at, created_by, updated_at, updated_by, del_flag) FROM stdin;
\.


--
-- TOC entry 5061 (class 0 OID 27124)
-- Dependencies: 256
-- Data for Name: reviews; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.reviews (id, rating, comment, image_url, user_id, order_id, watch_id, created_at, created_by, updated_at, updated_by, del_flag) FROM stdin;
6	4.5	Đơn hàng khá tốt	order.png	10	17	16	20251008220059	10	\N	\N	0
\.


--
-- TOC entry 5021 (class 0 OID 26834)
-- Dependencies: 216
-- Data for Name: roles; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.roles (id, code, name, description, created_at, created_by, updated_at, updated_by, del_flag) FROM stdin;
1	ADMIN	Quản trị viên	Người quản trị hệ thống	20250917244327	0	20250917244327	0	0
2	CUSTOMER	Khách hàng	Khách hàng	20250918110017	10	20250918112131	10	0
3	CUSTOMER23	Khách hàng23		20250918112448	10	20250918135839	10	1
\.


--
-- TOC entry 5063 (class 0 OID 27149)
-- Dependencies: 258
-- Data for Name: shipments; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.shipments (id, order_id, carrier, tracking_code, estimated_delivery, delivered_at, created_at, created_by, updated_at, updated_by, del_flag) FROM stdin;
\.


--
-- TOC entry 5039 (class 0 OID 26953)
-- Dependencies: 234
-- Data for Name: strap_materials; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.strap_materials (id, code, name, description, extra_money, created_at, created_by, updated_at, updated_by, del_flag) FROM stdin;
2	THEPCAOCAP	Thép cao cấp	\N	1000000	20250922224729	10	\N	\N	0
1	DABO	Da bò	\N	700000	20250921150413	10	20250921150609	10	0
\.


--
-- TOC entry 5065 (class 0 OID 27162)
-- Dependencies: 260
-- Data for Name: tb_dictionarys; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.tb_dictionarys (id, col_nm, col_val, content, lang, note) FROM stdin;
1	token_type	0	Refresh Token	vi	Dùng để get access token
2	token_type	1	Reset password token	vi	Dùng để reset password
3	discount_type	0	Giảm cố định	vi	Bảng discount
4	discount_type	1	Giảm theo phần trăm	vi	Bảng discount
\.


--
-- TOC entry 5067 (class 0 OID 27172)
-- Dependencies: 262
-- Data for Name: tokens; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.tokens (id, owner_type, user_id, token_type, token_value, device_info, ip_address, is_active, expires_at, revoked_at, created_at, created_by, updated_at, updated_by) FROM stdin;
5	user	10	0	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE3NjA3NTI5MTEsInVzZXJJZCI6IjEwIiwiaWF0IjoxNzU4MTYwOTExfQ.KVk0BQBjCDg4tvWBBS0K1c2nvIVQ9Mv8nPqN5HHS_c0	PostmanRuntime/7.46.1	::1	0	20251018090151	\N	20251018090151	10	\N	\N
6	user	10	0	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE3NjA3NTY1MjQsInVzZXJJZCI6IjEwIiwiaWF0IjoxNzU4MTY0NTI0fQ.pW0kKlH1S0xlMtpPJ9WsH6KcoQ5D5Tw6Nl6o6QKkoP8	PostmanRuntime/7.46.1	::1	0	20251018100204	\N	20251018100204	10	\N	\N
7	user	10	0	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE3NjA3NTg4MjgsInVzZXJJZCI6IjEwIiwiaWF0IjoxNzU4MTY2ODI4fQ.L8CVfSw7cZEaslJ8NLdZ09o8rVqDZ1sUkN2TwWmjsFU	PostmanRuntime/7.46.1	::1	0	20251018104028	\N	20251018104028	10	\N	\N
8	user	10	0	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE3NjA3NTk4MDQsInVzZXJJZCI6IjEwIiwiaWF0IjoxNzU4MTY3ODA0fQ.WynKZGeW2zhvqdXHybhSwnZNS7YTiJn7Q9bsi39Wy-0	PostmanRuntime/7.46.1	::1	0	20251018105644	\N	20251018105644	10	\N	\N
9	user	10	0	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE3NjA3NjM4ODIsInVzZXJJZCI6IjEwIiwiaWF0IjoxNzU4MTcxODgyfQ.F91MlzxPgDV_54YVNyQUbG2n6UC84EKc_tAsQIom7Mk	PostmanRuntime/7.46.1	::1	0	20251018120442	\N	20251018120442	10	\N	\N
10	user	10	0	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE3NjA3NjgxNzcsInVzZXJJZCI6IjEwIiwiaWF0IjoxNzU4MTc2MTc3fQ.jWX8RjvY0Y5WJoTqEeDx7quJ5FqIvSzdXMZVNu5tJqU	PostmanRuntime/7.46.1	::1	0	20251018131617	\N	20251018131617	10	\N	\N
11	user	10	0	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE3NjA3NzA0MTgsInVzZXJJZCI6IjEwIiwiaWF0IjoxNzU4MTc4NDE4fQ.NSA-fLJ8ztwDY7gBaSrd7Irn8FPAnaUeUn8XqkI9WzU	PostmanRuntime/7.46.1	::1	0	20251018135338	\N	20251018135338	10	\N	\N
12	user	10	0	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE3NjA4ODQ3MjIsInVzZXJJZCI6IjEwIiwiaWF0IjoxNzU4MjkyNzIyfQ.HuEMivFnS27HjCt7w9ABWL_HTp1FdGLbipxDkuvAcGs	PostmanRuntime/7.46.1	::1	0	20251019213842	\N	20251019213842	10	\N	\N
13	user	10	0	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE3NjExNDI3MTIsInVzZXJJZCI6IjEwIiwiaWF0IjoxNzU4NTUwNzEyfQ.wbbjwyCDI3O6QUE2tAZmarnZoAVQLZO4NBSafl7r0CY	Windows 10 - Chrome 140.0.0.0	::1	0	20251022211832	\N	20251022211832	10	\N	\N
14	user	10	0	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE3NjExNDI3ODAsInVzZXJJZCI6IjEwIiwiaWF0IjoxNzU4NTUwNzgwfQ.5gEKAoGDE7fH3WpOA-8tJ3nYghiQvqCdByLRrmTInsE	PostmanRuntime/7.46.1	::1	0	20251022211940	\N	20251022211940	10	\N	\N
15	user	10	0	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE3NjExNDI5NTksInVzZXJJZCI6IjEwIiwiaWF0IjoxNzU4NTUwOTU5fQ.Z2QQFeATp6BZ9t4tHYBDHYtF7i4tUiryoUd6Tj_u5PU	Windows 10 - Chrome 140.0.0.0	::1	0	20251022212239	\N	20251022212239	10	\N	\N
16	user	10	0	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE3NjExNDMyMTMsInVzZXJJZCI6IjEwIiwiaWF0IjoxNzU4NTUxMjEzfQ.8qMWkw9_hzgAaS5BaMupGAdX21eX9Z95iMi8xXOPxZ0	PostmanRuntime/7.46.1	::1	0	20251022212653	\N	20251022212653	10	\N	\N
17	user	10	0	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE3NjExNDMyMzYsInVzZXJJZCI6IjEwIiwiaWF0IjoxNzU4NTUxMjM2fQ.bAPnFxJalTNTJgb_7FjxLDLUHCS9pvODAezULU_VtGk	PostmanRuntime/7.46.1	::1	0	20251022212716	\N	20251022212716	10	\N	\N
18	user	10	0	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE3NjExNDMyNTYsInVzZXJJZCI6IjEwIiwiaWF0IjoxNzU4NTUxMjU2fQ.VyDpfBQlkhvKn__nEpntztNO8RMQi8On87WZVa8aTXE	PostmanRuntime/7.46.1	::1	0	20251022212736	\N	20251022212736	10	\N	\N
19	user	10	0	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE3NjExNDMzNjgsInVzZXJJZCI6IjEwIiwiaWF0IjoxNzU4NTUxMzY4fQ.rNevfTk8IkhgHXMGJpD1MisP2IXhJVPv8DCECypwVpE	Windows 10 - Chrome 140.0.0.0	::1	0	20251022212928	\N	20251022212928	10	\N	\N
20	user	10	0	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE3NjExNDM0MTMsInVzZXJJZCI6IjEwIiwiaWF0IjoxNzU4NTUxNDEzfQ.tw2l5_uDXlE1A6lC7AL-7HTpUAk8I96gUyU7Ivou6gE	Windows 10 - Chrome 140.0.0.0	::1	0	20251022213013	\N	20251022213013	10	\N	\N
21	user	10	0	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE3NjExNDM1NTUsInVzZXJJZCI6IjEwIiwiaWF0IjoxNzU4NTUxNTU1fQ.JM542Cm0ONd6q2ekDJiXT4j4N3M8CIex-DGwHg4L1mk	Windows 10 - Chrome 140.0.0.0	::1	0	20251022213235	\N	20251022213235	10	\N	\N
22	user	10	0	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE3NjExNDM3NDgsInVzZXJJZCI6IjEwIiwiaWF0IjoxNzU4NTUxNzQ4fQ.SfQFfRuocHkukzkvrmWE79UISfxoiEwfdPGJRB1TTVk	Windows 10 - Chrome 140.0.0.0	::1	0	20251022213548	\N	20251022213548	10	\N	\N
23	user	10	0	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE3NjExNDM3NjIsInVzZXJJZCI6IjEwIiwiaWF0IjoxNzU4NTUxNzYyfQ.FHSs19rUpk_3-FrGbUtsD2yuQLFYwGsWXYTQPBvs4L4	Windows 10 - Chrome 140.0.0.0	::1	0	20251022213602	\N	20251022213602	10	\N	\N
24	user	10	0	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE3NjExNDM4NDEsInVzZXJJZCI6IjEwIiwiaWF0IjoxNzU4NTUxODQxfQ.l3di-R5O36jV6dfs8ofHYabKnkXs_m9T_tVuSNX_MdA	Windows 10 - Chrome 140.0.0.0	::1	0	20251022213721	\N	20251022213721	10	\N	\N
25	user	10	0	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE3NjExNDYxMDAsInVzZXJJZCI6IjEwIiwiaWF0IjoxNzU4NTU0MTAwfQ.DCWTzD-WAcZZ9W7-OOkQp6JJ_R9rRw2j4T_CGp0wBk4	Windows 10 - Chrome 140.0.0.0	::1	0	20251022221500	\N	20251022221500	10	\N	\N
26	user	10	0	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE3NjEzOTk4MjYsInVzZXJJZCI6IjEwIiwiaWF0IjoxNzU4ODA3ODI2fQ.BoZGiSFrT5oWVQ3TXSJMIGzx4mSZRnd8VsLEJ8HbcCc	PostmanRuntime/7.47.1	::1	0	20251025204346	\N	20251025204346	10	\N	\N
27	user	10	0	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE3NjE1NTEyMTAsInVzZXJJZCI6IjEwIiwiaWF0IjoxNzU4OTU5MjEwfQ.AEImQ9ewiL0qN1n_S3kLXhNmdFKqy_paiQvqQVG0C5A	PostmanRuntime/7.47.1	::1	0	20251027144650	\N	20251027144650	10	\N	\N
28	user	10	0	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE3NjE2MzE2OTUsInVzZXJJZCI6IjEwIiwiaWF0IjoxNzU5MDM5Njk1fQ.jyAdtCfGQzZ77G_E0Agv7FWhYkaPwJTS_oFq9f1gHwc	Windows 10 - Chrome 140.0.0.0	::1	0	20251028130815	\N	20251028130815	10	\N	\N
29	user	10	0	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE3NjE2MzI0MTYsInVzZXJJZCI6IjEwIiwiaWF0IjoxNzU5MDQwNDE2fQ.xyPujjgUqEVCL70Bbv_MFqy6SpTqHOL_a_dwJhcasRs	Windows 10 - Chrome 140.0.0.0	::1	0	20251028132016	\N	20251028132016	10	\N	\N
30	user	10	0	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE3NjE2MzI2MjUsInVzZXJJZCI6IjEwIiwiaWF0IjoxNzU5MDQwNjI1fQ.PhgrXYOmtKBdAWRJn3fkth_SHTsQne77glyjc6-Oe1E	Windows 10 - Chrome 140.0.0.0	::1	0	20251028132345	\N	20251028132345	10	\N	\N
31	user	10	0	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE3NjIwNTU5NTAsInVzZXJJZCI6IjEwIiwiaWF0IjoxNzU5NDYzOTUwfQ.I_url6INvvoSGBd0TVEbdQHQE7JY26tyjUPhbW8TLQI	Windows 10 - Chrome 140.0.0.0	::1	0	20251102105910	\N	20251102105910	10	\N	\N
32	user	10	0	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE3NjIwNTU5OTQsInVzZXJJZCI6IjEwIiwiaWF0IjoxNzU5NDYzOTk0fQ.sOTOITo8VDHyFb79qMGXGdt2UGYFqhl75Q6lManl8iY	Windows 10 - Chrome 140.0.0.0	::1	0	20251102105954	\N	20251102105954	10	\N	\N
33	user	10	0	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE3NjIwOTQzOTAsInVzZXJJZCI6IjEwIiwiaWF0IjoxNzU5NTAyMzkwfQ.szZutbqEFe3947E96mfaCTHqTG9G7eH54QiiW0O3Da8	Windows 10 - Chrome 140.0.0.0	::1	0	20251102213950	\N	20251102213950	10	\N	\N
34	user	10	0	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE3NjIwOTQ0NzYsInVzZXJJZCI6IjEwIiwiaWF0IjoxNzU5NTAyNDc2fQ.8e0m2TWRoLzNN-AJD6ZQWysUaC9r33G9vOCkBaaykLw	Windows 10 - Chrome 140.0.0.0	::1	0	20251102214116	\N	20251102214116	10	\N	\N
35	user	10	0	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE3NjIwOTQ5MDMsInVzZXJJZCI6IjEwIiwiaWF0IjoxNzU5NTAyOTAzfQ.EAcpVN8uo9nviOqc1hVX8mQIjZmqMZbZyhrVYwJarJM	Windows 10 - Chrome 140.0.0.0	::1	0	20251102214823	\N	20251102214823	10	\N	\N
36	user	10	0	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE3NjIwOTYxOTMsInVzZXJJZCI6IjEwIiwiaWF0IjoxNzU5NTA0MTkzfQ.vDFDPQtsfbkt2XR9wu7QISsf5bAjNY5cOJU1Ww_YuNo	Windows 10 - Chrome 140.0.0.0	::1	0	20251102220953	\N	20251102220953	10	\N	\N
37	user	10	0	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE3NjIwOTYyNjcsInVzZXJJZCI6IjEwIiwiaWF0IjoxNzU5NTA0MjY3fQ.TK55aJ5yX7UwGmqOUIFT5YjwH0JHEms0o6T9WY4o6Mc	Windows 10 - Chrome 140.0.0.0	::1	0	20251102221107	\N	20251102221107	10	\N	\N
38	user	10	0	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE3NjIwOTYyOTYsInVzZXJJZCI6IjEwIiwiaWF0IjoxNzU5NTA0Mjk2fQ.JcTmxx79HgkDuYusnL3ILBrbTnBEZBdK1ZJ3LkjPZMQ	Windows 10 - Chrome 140.0.0.0	::1	0	20251102221136	\N	20251102221136	10	\N	\N
39	user	10	0	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE3NjIwOTY0MDAsInVzZXJJZCI6IjEwIiwiaWF0IjoxNzU5NTA0NDAwfQ.m7QjR62qkF5fCd6Ew_4-TwYeA7XCqQMJ72V0P71L18c	Windows 10 - Chrome 140.0.0.0	::1	1	20251102221320	\N	20251102221320	10	\N	\N
40	user	10	0	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE3NjIwOTc4MjksInVzZXJJZCI6IjEwIiwiaWF0IjoxNzU5NTA1ODI5fQ.1S7lPqkvGkkmUi9z-kueFShmisUJVf1G81sgCSA1VTU	Windows 10 - Chrome 140.0.0.0	::1	1	20251102223709	\N	20251102223709	10	\N	\N
41	user	10	0	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE3NjIwOTc5MTksInVzZXJJZCI6IjEwIiwiaWF0IjoxNzU5NTA1OTE5fQ.4N4ja8i94UeWKxQCGHJcCjPfH-3nPIp77p8xP83xJVQ	Windows 10 - Chrome 140.0.0.0	::1	1	20251102223839	\N	20251102223839	10	\N	\N
42	user	10	0	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE3NjIwOTc5MzIsInVzZXJJZCI6IjEwIiwiaWF0IjoxNzU5NTA1OTMyfQ.o-rMSkfCl9Vx_TPiOi4OZwpeLtfGxZ7Ok6b09kXwiFE	Windows 10 - Chrome 140.0.0.0	::1	1	20251102223852	\N	20251102223852	10	\N	\N
43	user	10	0	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE3NjIwOTgwNjQsInVzZXJJZCI6IjEwIiwiaWF0IjoxNzU5NTA2MDY0fQ.5fqJMrfBWdfUtAQNXJdDLY1HdeKm49INQpnFMm0qd6A	Windows 10 - Chrome 140.0.0.0	::1	1	20251102224104	\N	20251102224104	10	\N	\N
44	user	10	0	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE3NjIwOTgwOTYsInVzZXJJZCI6IjEwIiwiaWF0IjoxNzU5NTA2MDk2fQ.K_cqLZy34dYF-vH0UuAJNUXdN2jX_g5UZsd4PSYMSCk	Windows 10 - Chrome 140.0.0.0	::1	1	20251102224136	\N	20251102224136	10	\N	\N
45	user	10	0	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE3NjIwOTg3MTksInVzZXJJZCI6IjEwIiwiaWF0IjoxNzU5NTA2NzE5fQ.gYYVgWPmjjIm_UT4iQF6LEXBRpeGeekY4ho8o_-GSJ0	Windows 10 - Chrome 140.0.0.0	::1	1	20251102225159	\N	20251102225159	10	\N	\N
46	user	10	0	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE3NjIwOTkwMDAsInVzZXJJZCI6IjEwIiwiaWF0IjoxNzU5NTA3MDAwfQ._s9l_n7Ig8PC2dtQxDchVACQ3ozHYLotxqLi7l_OgH4	Windows 10 - Chrome 140.0.0.0	::1	1	20251102225640	\N	20251102225640	10	\N	\N
47	user	10	0	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE3NjIwOTkwMTMsInVzZXJJZCI6IjEwIiwiaWF0IjoxNzU5NTA3MDEzfQ.a30OdF7xXSqWFlnLb2D-crhP6NUI-Wby7G6nKvgL4JI	Windows 10 - Chrome 140.0.0.0	::1	1	20251102225653	\N	20251102225653	10	\N	\N
48	user	10	0	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE3NjIwOTkwMzQsInVzZXJJZCI6IjEwIiwiaWF0IjoxNzU5NTA3MDM0fQ.WKA84VmtCsg6UvoJZidPq48TvM3C9qK_GtNG6UQs3DI	Windows 10 - Chrome 140.0.0.0	::1	1	20251102225714	\N	20251102225714	10	\N	\N
49	user	10	0	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE3NjIwOTk2NjQsInVzZXJJZCI6IjEwIiwiaWF0IjoxNzU5NTA3NjY0fQ.CEAVQ32jmfBU9z-_6IcWAFArUknNkhJcfG4YKiO30_0	Windows 10 - Chrome 140.0.0.0	::1	1	20251102230744	\N	20251102230744	10	\N	\N
50	user	10	0	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE3NjIxMDAwMjgsInVzZXJJZCI6IjEwIiwiaWF0IjoxNzU5NTA4MDI4fQ.MzIWf7T5a87_sclZ7T-ifjGMdSfDgxusMaq05MnZBC4	Windows 10 - Chrome 140.0.0.0	::1	1	20251102231348	\N	20251102231348	10	\N	\N
51	user	10	0	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE3NjIxNzIzMzIsInVzZXJJZCI6IjEwIiwiaWF0IjoxNzU5NTgwMzMyfQ.WyAVBMoIuMTSB386CFyrWDNs5U9szko6b3-1ZJ4EahI	Windows 10 - Chrome 141.0.0.0	::1	1	20251103191852	\N	20251103191852	10	\N	\N
52	user	10	0	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE3NjIxNzI0ODcsInVzZXJJZCI6IjEwIiwiaWF0IjoxNzU5NTgwNDg3fQ.DjLFs0Q8se1yg6NTQolRNoN1XzYBWRuGgTvpsd7pXFI	Windows 10 - Chrome 141.0.0.0	::1	1	20251103192127	\N	20251103192127	10	\N	\N
53	user	10	0	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE3NjIxNzI1NjUsInVzZXJJZCI6IjEwIiwiaWF0IjoxNzU5NTgwNTY1fQ.LmHtmc899w6mA-cyjohZER0Wu9mg2gE7KjPyw3Tiv3g	Windows 10 - Chrome 141.0.0.0	::1	1	20251103192245	\N	20251103192245	10	\N	\N
54	user	10	0	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE3NjIxNzI3NjMsInVzZXJJZCI6IjEwIiwiaWF0IjoxNzU5NTgwNzYzfQ.FywJ43Ijqm1GFRT0cL_wm6bFdT0p5i9dsrrGIWQr2SE	Windows 10 - Chrome 141.0.0.0	::1	1	20251103192603	\N	20251103192603	10	\N	\N
\.


--
-- TOC entry 5023 (class 0 OID 26842)
-- Dependencies: 218
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.users (id, code, username, password, email, phone_number, first_name, last_name, gender, date_of_birth, address, status, created_at, created_by, updated_at, updated_by, del_flag, role_id) FROM stdin;
10	\N	lkhai4617	$2b$10$E6oHxwvfKlh6xr8RmQd91O4jopC7YcpQww00RXGruo7Se/FYcrw8K	lkhai4617@gmail.com	\N	Lê	Khải	\N	20030720	\N	0	20250918090151	\N	20250918102851	10	0	1
\.


--
-- TOC entry 5041 (class 0 OID 26961)
-- Dependencies: 236
-- Data for Name: watch_variants; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.watch_variants (id, watch_id, color_id, strap_material_id, stock_quantity, price, created_at, created_by, updated_at, updated_by, del_flag) FROM stdin;
27	16	2	2	50	9500000	20250929230400	10	\N	\N	0
28	16	2	1	50	9200000	20250929230525	10	\N	\N	0
29	17	1	2	50	9500000	20250929230539	10	\N	\N	0
30	17	1	1	30	9200000	20250929230539	10	\N	\N	0
26	16	1	1	27	9200000	20250929230324	10	\N	\N	0
25	16	1	2	47	9500000	20250929230324	10	\N	\N	0
\.


--
-- TOC entry 5035 (class 0 OID 26918)
-- Dependencies: 230
-- Data for Name: watches; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.watches (id, code, name, description, model, case_material, case_size, strap_size, gender, water_resistance, release_date, sold, base_price, rating, status, thumbnail, slider, created_at, updated_at, updated_by, del_flag, category_id, brand_id, movement_type_id, created_by) FROM stdin;
16	TEST	Seiko Presage Automatic	Đồng hồ cơ Seiko Presage Automatic với thiết kế sang trọng, kính sapphire chống xước, phù hợp cả đi làm và đi chơi.	SRPB41J1	Thép không gỉ	41	20	0	5 ATM	2023-10-15	1	8500000	4.5	t	https://example.com/images/seiko-thumbnail.jpg	https://example.com/images/seiko-slider1.jpg,https://example.com/images/seiko-slider2.jpg	20250929230324	20251008220059	10	0	1	1	1	10
17	WATXIN	Seiko Presage Automatic	Đồng hồ cơ Seiko Presage Automatic với thiết kế sang trọng, kính sapphire chống xước, phù hợp cả đi làm và đi chơi.	SRPB41J1	Thép không gỉ	41	20	0	5 ATM	2023-10-15	0	8500000	0	t	https://example.com/images/seiko-thumbnail.jpg	https://example.com/images/seiko-slider1.jpg,https://example.com/images/seiko-slider2.jpg	20250929230539	\N	\N	0	1	1	1	10
\.


--
-- TOC entry 5097 (class 0 OID 0)
-- Dependencies: 219
-- Name: addresses_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.addresses_id_seq', 3, true);


--
-- TOC entry 5098 (class 0 OID 0)
-- Dependencies: 221
-- Name: brands_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.brands_id_seq', 1, true);


--
-- TOC entry 5099 (class 0 OID 0)
-- Dependencies: 237
-- Name: cart_items_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.cart_items_id_seq', 12, true);


--
-- TOC entry 5100 (class 0 OID 0)
-- Dependencies: 223
-- Name: carts_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.carts_id_seq', 15, true);


--
-- TOC entry 5101 (class 0 OID 0)
-- Dependencies: 225
-- Name: categorys_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.categorys_id_seq', 1, true);


--
-- TOC entry 5102 (class 0 OID 0)
-- Dependencies: 231
-- Name: colors_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.colors_id_seq', 2, true);


--
-- TOC entry 5103 (class 0 OID 0)
-- Dependencies: 239
-- Name: config_order_status_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.config_order_status_id_seq', 6, true);


--
-- TOC entry 5104 (class 0 OID 0)
-- Dependencies: 241
-- Name: discounts_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.discounts_id_seq', 1, true);


--
-- TOC entry 5105 (class 0 OID 0)
-- Dependencies: 227
-- Name: movement_types_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.movement_types_id_seq', 2, true);


--
-- TOC entry 5106 (class 0 OID 0)
-- Dependencies: 245
-- Name: order_details_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.order_details_id_seq', 36, true);


--
-- TOC entry 5107 (class 0 OID 0)
-- Dependencies: 247
-- Name: order_status_history_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.order_status_history_id_seq', 39, true);


--
-- TOC entry 5108 (class 0 OID 0)
-- Dependencies: 243
-- Name: orders_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.orders_id_seq', 18, true);


--
-- TOC entry 5109 (class 0 OID 0)
-- Dependencies: 249
-- Name: payments_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.payments_id_seq', 6, true);


--
-- TOC entry 5110 (class 0 OID 0)
-- Dependencies: 253
-- Name: permission_role_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.permission_role_id_seq', 1, false);


--
-- TOC entry 5111 (class 0 OID 0)
-- Dependencies: 251
-- Name: permissions_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.permissions_id_seq', 1, false);


--
-- TOC entry 5112 (class 0 OID 0)
-- Dependencies: 255
-- Name: reviews_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.reviews_id_seq', 6, true);


--
-- TOC entry 5113 (class 0 OID 0)
-- Dependencies: 215
-- Name: roles_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.roles_id_seq', 3, true);


--
-- TOC entry 5114 (class 0 OID 0)
-- Dependencies: 257
-- Name: shipments_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.shipments_id_seq', 1, false);


--
-- TOC entry 5115 (class 0 OID 0)
-- Dependencies: 233
-- Name: strap_materials_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.strap_materials_id_seq', 2, true);


--
-- TOC entry 5116 (class 0 OID 0)
-- Dependencies: 259
-- Name: tb_dictionarys_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.tb_dictionarys_id_seq', 4, true);


--
-- TOC entry 5117 (class 0 OID 0)
-- Dependencies: 261
-- Name: tokens_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.tokens_id_seq', 54, true);


--
-- TOC entry 5118 (class 0 OID 0)
-- Dependencies: 217
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.users_id_seq', 10, true);


--
-- TOC entry 5119 (class 0 OID 0)
-- Dependencies: 235
-- Name: watch_variants_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.watch_variants_id_seq', 30, true);


--
-- TOC entry 5120 (class 0 OID 0)
-- Dependencies: 229
-- Name: watches_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.watches_id_seq', 17, true);


--
-- TOC entry 4808 (class 2606 OID 26867)
-- Name: addresses addresses_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.addresses
    ADD CONSTRAINT addresses_pkey PRIMARY KEY (id);


--
-- TOC entry 4810 (class 2606 OID 26882)
-- Name: brands brands_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.brands
    ADD CONSTRAINT brands_pkey PRIMARY KEY (id);


--
-- TOC entry 4826 (class 2606 OID 26990)
-- Name: cart_items cart_items_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.cart_items
    ADD CONSTRAINT cart_items_pkey PRIMARY KEY (id);


--
-- TOC entry 4812 (class 2606 OID 26891)
-- Name: carts carts_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.carts
    ADD CONSTRAINT carts_pkey PRIMARY KEY (id);


--
-- TOC entry 4814 (class 2606 OID 26906)
-- Name: categorys categorys_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.categorys
    ADD CONSTRAINT categorys_pkey PRIMARY KEY (id);


--
-- TOC entry 4820 (class 2606 OID 26951)
-- Name: colors colors_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.colors
    ADD CONSTRAINT colors_pkey PRIMARY KEY (id);


--
-- TOC entry 4828 (class 2606 OID 27010)
-- Name: config_order_status config_order_status_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.config_order_status
    ADD CONSTRAINT config_order_status_pkey PRIMARY KEY (id);


--
-- TOC entry 4830 (class 2606 OID 27018)
-- Name: discounts discounts_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.discounts
    ADD CONSTRAINT discounts_pkey PRIMARY KEY (id);


--
-- TOC entry 4816 (class 2606 OID 26916)
-- Name: movement_types movement_types_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.movement_types
    ADD CONSTRAINT movement_types_pkey PRIMARY KEY (id);


--
-- TOC entry 4834 (class 2606 OID 27047)
-- Name: order_details order_details_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.order_details
    ADD CONSTRAINT order_details_pkey PRIMARY KEY (id);


--
-- TOC entry 4836 (class 2606 OID 27070)
-- Name: order_status_history order_status_history_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.order_status_history
    ADD CONSTRAINT order_status_history_pkey PRIMARY KEY (id);


--
-- TOC entry 4832 (class 2606 OID 27029)
-- Name: orders orders_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.orders
    ADD CONSTRAINT orders_pkey PRIMARY KEY (id);


--
-- TOC entry 4838 (class 2606 OID 27089)
-- Name: payments payments_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.payments
    ADD CONSTRAINT payments_pkey PRIMARY KEY (id);


--
-- TOC entry 4842 (class 2606 OID 27112)
-- Name: permission_role permission_role_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.permission_role
    ADD CONSTRAINT permission_role_pkey PRIMARY KEY (id);


--
-- TOC entry 4840 (class 2606 OID 27104)
-- Name: permissions permissions_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.permissions
    ADD CONSTRAINT permissions_pkey PRIMARY KEY (id);


--
-- TOC entry 4844 (class 2606 OID 27132)
-- Name: reviews reviews_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.reviews
    ADD CONSTRAINT reviews_pkey PRIMARY KEY (id);


--
-- TOC entry 4804 (class 2606 OID 26840)
-- Name: roles roles_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.roles
    ADD CONSTRAINT roles_pkey PRIMARY KEY (id);


--
-- TOC entry 4846 (class 2606 OID 27155)
-- Name: shipments shipments_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.shipments
    ADD CONSTRAINT shipments_pkey PRIMARY KEY (id);


--
-- TOC entry 4822 (class 2606 OID 26959)
-- Name: strap_materials strap_materials_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.strap_materials
    ADD CONSTRAINT strap_materials_pkey PRIMARY KEY (id);


--
-- TOC entry 4848 (class 2606 OID 27169)
-- Name: tb_dictionarys tb_dictionarys_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tb_dictionarys
    ADD CONSTRAINT tb_dictionarys_pkey PRIMARY KEY (id);


--
-- TOC entry 4850 (class 2606 OID 27180)
-- Name: tokens tokens_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tokens
    ADD CONSTRAINT tokens_pkey PRIMARY KEY (id);


--
-- TOC entry 4806 (class 2606 OID 26851)
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- TOC entry 4824 (class 2606 OID 26967)
-- Name: watch_variants watch_variants_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.watch_variants
    ADD CONSTRAINT watch_variants_pkey PRIMARY KEY (id);


--
-- TOC entry 4818 (class 2606 OID 26928)
-- Name: watches watches_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.watches
    ADD CONSTRAINT watches_pkey PRIMARY KEY (id);


--
-- TOC entry 4852 (class 2606 OID 334856)
-- Name: addresses addresses_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.addresses
    ADD CONSTRAINT addresses_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 4860 (class 2606 OID 334918)
-- Name: cart_items cart_items_cart_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.cart_items
    ADD CONSTRAINT cart_items_cart_id_fkey FOREIGN KEY (cart_id) REFERENCES public.carts(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 4861 (class 2606 OID 334923)
-- Name: cart_items cart_items_variant_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.cart_items
    ADD CONSTRAINT cart_items_variant_id_fkey FOREIGN KEY (variant_id) REFERENCES public.watch_variants(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- TOC entry 4853 (class 2606 OID 334863)
-- Name: carts carts_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.carts
    ADD CONSTRAINT carts_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- TOC entry 4864 (class 2606 OID 334948)
-- Name: order_details order_details_order_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.order_details
    ADD CONSTRAINT order_details_order_id_fkey FOREIGN KEY (order_id) REFERENCES public.orders(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- TOC entry 4865 (class 2606 OID 334953)
-- Name: order_details order_details_variant_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.order_details
    ADD CONSTRAINT order_details_variant_id_fkey FOREIGN KEY (variant_id) REFERENCES public.watch_variants(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- TOC entry 4866 (class 2606 OID 334960)
-- Name: order_details order_details_watch_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.order_details
    ADD CONSTRAINT order_details_watch_id_fkey FOREIGN KEY (watch_id) REFERENCES public.watches(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- TOC entry 4867 (class 2606 OID 334965)
-- Name: order_status_history order_status_history_order_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.order_status_history
    ADD CONSTRAINT order_status_history_order_id_fkey FOREIGN KEY (order_id) REFERENCES public.orders(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- TOC entry 4868 (class 2606 OID 334970)
-- Name: order_status_history order_status_history_status_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.order_status_history
    ADD CONSTRAINT order_status_history_status_id_fkey FOREIGN KEY (status_id) REFERENCES public.config_order_status(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- TOC entry 4862 (class 2606 OID 334941)
-- Name: orders orders_current_status_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.orders
    ADD CONSTRAINT orders_current_status_id_fkey FOREIGN KEY (current_status_id) REFERENCES public.config_order_status(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- TOC entry 4863 (class 2606 OID 334934)
-- Name: orders orders_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.orders
    ADD CONSTRAINT orders_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- TOC entry 4869 (class 2606 OID 334977)
-- Name: payments payments_order_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.payments
    ADD CONSTRAINT payments_order_id_fkey FOREIGN KEY (order_id) REFERENCES public.orders(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- TOC entry 4870 (class 2606 OID 334993)
-- Name: permission_role permission_role_permission_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.permission_role
    ADD CONSTRAINT permission_role_permission_id_fkey FOREIGN KEY (permission_id) REFERENCES public.permissions(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 4871 (class 2606 OID 334988)
-- Name: permission_role permission_role_role_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.permission_role
    ADD CONSTRAINT permission_role_role_id_fkey FOREIGN KEY (role_id) REFERENCES public.roles(id) ON UPDATE CASCADE;


--
-- TOC entry 4872 (class 2606 OID 335005)
-- Name: reviews reviews_order_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.reviews
    ADD CONSTRAINT reviews_order_id_fkey FOREIGN KEY (order_id) REFERENCES public.orders(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 4873 (class 2606 OID 335000)
-- Name: reviews reviews_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.reviews
    ADD CONSTRAINT reviews_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id) ON UPDATE CASCADE;


--
-- TOC entry 4874 (class 2606 OID 335010)
-- Name: reviews reviews_watch_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.reviews
    ADD CONSTRAINT reviews_watch_id_fkey FOREIGN KEY (watch_id) REFERENCES public.watches(id) ON UPDATE CASCADE;


--
-- TOC entry 4875 (class 2606 OID 335017)
-- Name: shipments shipments_order_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.shipments
    ADD CONSTRAINT shipments_order_id_fkey FOREIGN KEY (order_id) REFERENCES public.orders(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- TOC entry 4876 (class 2606 OID 335024)
-- Name: tokens tokens_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tokens
    ADD CONSTRAINT tokens_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 4851 (class 2606 OID 334847)
-- Name: users users_role_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_role_id_fkey FOREIGN KEY (role_id) REFERENCES public.roles(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 4857 (class 2606 OID 334906)
-- Name: watch_variants watch_variants_color_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.watch_variants
    ADD CONSTRAINT watch_variants_color_id_fkey FOREIGN KEY (color_id) REFERENCES public.colors(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- TOC entry 4858 (class 2606 OID 334911)
-- Name: watch_variants watch_variants_strap_material_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.watch_variants
    ADD CONSTRAINT watch_variants_strap_material_id_fkey FOREIGN KEY (strap_material_id) REFERENCES public.strap_materials(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- TOC entry 4859 (class 2606 OID 334901)
-- Name: watch_variants watch_variants_watch_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.watch_variants
    ADD CONSTRAINT watch_variants_watch_id_fkey FOREIGN KEY (watch_id) REFERENCES public.watches(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- TOC entry 4854 (class 2606 OID 334887)
-- Name: watches watches_brand_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.watches
    ADD CONSTRAINT watches_brand_id_fkey FOREIGN KEY (brand_id) REFERENCES public.brands(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- TOC entry 4855 (class 2606 OID 334882)
-- Name: watches watches_category_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.watches
    ADD CONSTRAINT watches_category_id_fkey FOREIGN KEY (category_id) REFERENCES public.categorys(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- TOC entry 4856 (class 2606 OID 334892)
-- Name: watches watches_movement_type_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.watches
    ADD CONSTRAINT watches_movement_type_id_fkey FOREIGN KEY (movement_type_id) REFERENCES public.movement_types(id) ON UPDATE CASCADE ON DELETE SET NULL;


-- Completed on 2025-10-12 16:30:14

--
-- PostgreSQL database dump complete
--

